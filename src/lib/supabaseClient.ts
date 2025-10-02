// Complete Supabase client stub for demo
export const supabase = {
  auth: {
    signIn: async () => ({ data: { user: null }, error: null }),
    signUp: async () => ({ data: { user: null }, error: null }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null })
  },
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        single: () => ({ data: { id: 'demo-id' }, error: null }),
        order: (column: string, options: any) => ({
          limit: (count: number) => ({ data: [], error: null })
        })
      }),
      order: (column: string, options: any) => ({
        limit: (count: number) => ({ data: [], error: null })
      })
    }),
    insert: (data: any) => ({ data: null, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({ data: null, error: null })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({ data: null, error: null })
    })
  })
};