-- Supabase function to sync Paddle subscription data
-- This function can be called from the Paddle webhook handler

CREATE OR REPLACE FUNCTION sync_paddle_subscription(
  subscription_id TEXT,
  user_id TEXT,
  tier TEXT,
  status TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Insert or update subscription
  INSERT INTO public.subscriptions (
    id,
    user_id,
    tier,
    status,
    started_at,
    expires_at,
    created_at,
    updated_at
  ) VALUES (
    subscription_id,
    user_id,
    tier,
    status,
    started_at,
    expires_at,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    tier = EXCLUDED.tier,
    status = EXCLUDED.status,
    expires_at = EXCLUDED.expires_at,
    updated_at = NOW();

  -- Update user role if subscription is active
  IF status = 'active' THEN
    UPDATE public.users 
    SET role = tier, updated_at = NOW()
    WHERE id = user_id;
  END IF;

  -- Return success response
  SELECT json_build_object(
    'success', true,
    'subscription_id', subscription_id,
    'user_id', user_id,
    'tier', tier,
    'status', status
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION sync_paddle_subscription TO authenticated;

-- Create function to get subscription status
CREATE OR REPLACE FUNCTION get_user_subscription(user_id_param TEXT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'subscription_id', s.id,
    'tier', s.tier,
    'status', s.status,
    'started_at', s.started_at,
    'expires_at', s.expires_at,
    'is_active', s.status = 'active',
    'is_premium', s.tier IN ('coach', 'manager', 'lawyer')
  ) INTO result
  FROM public.subscriptions s
  WHERE s.user_id = user_id_param
  ORDER BY s.created_at DESC
  LIMIT 1;

  RETURN COALESCE(result, json_build_object(
    'subscription_id', NULL,
    'tier', 'buddy',
    'status', 'inactive',
    'started_at', NULL,
    'expires_at', NULL,
    'is_active', false,
    'is_premium', false
  ));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_subscription TO authenticated;

-- Create function to check if user has access to premium features
CREATE OR REPLACE FUNCTION check_premium_access(user_id_param TEXT, required_tier TEXT DEFAULT 'coach')
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  user_status TEXT;
BEGIN
  SELECT s.tier, s.status INTO user_tier, user_status
  FROM public.subscriptions s
  WHERE s.user_id = user_id_param
  AND s.status = 'active'
  ORDER BY s.created_at DESC
  LIMIT 1;

  -- If no subscription found, user is on buddy tier
  IF user_tier IS NULL THEN
    RETURN required_tier = 'buddy';
  END IF;

  -- Check if user tier meets requirement
  CASE required_tier
    WHEN 'buddy' THEN RETURN true;
    WHEN 'coach' THEN RETURN user_tier IN ('coach', 'manager', 'lawyer');
    WHEN 'manager' THEN RETURN user_tier IN ('manager', 'lawyer');
    WHEN 'lawyer' THEN RETURN user_tier = 'lawyer';
    ELSE RETURN false;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION check_premium_access TO authenticated;

-- Create function to get subscription analytics for admin
CREATE OR REPLACE FUNCTION get_subscription_analytics()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_subscriptions', COUNT(*),
    'active_subscriptions', COUNT(*) FILTER (WHERE status = 'active'),
    'canceled_subscriptions', COUNT(*) FILTER (WHERE status = 'canceled'),
    'paused_subscriptions', COUNT(*) FILTER (WHERE status = 'paused'),
    'tier_breakdown', json_build_object(
      'buddy', COUNT(*) FILTER (WHERE tier = 'buddy' AND status = 'active'),
      'coach', COUNT(*) FILTER (WHERE tier = 'coach' AND status = 'active'),
      'manager', COUNT(*) FILTER (WHERE tier = 'manager' AND status = 'active'),
      'lawyer', COUNT(*) FILTER (WHERE tier = 'lawyer' AND status = 'active')
    ),
    'revenue_this_month', COALESCE(
      SUM(CASE 
        WHEN tier = 'coach' THEN 29.99
        WHEN tier = 'manager' THEN 59.99
        WHEN tier = 'lawyer' THEN 99.99
        ELSE 0
      END) FILTER (WHERE status = 'active' AND started_at >= date_trunc('month', NOW())), 0
    )
  ) INTO result
  FROM public.subscriptions;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_subscription_analytics TO authenticated;





