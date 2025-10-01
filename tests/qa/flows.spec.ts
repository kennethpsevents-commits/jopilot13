import { test, expect } from "@playwright/test";

test.describe("WeAreJobPilot - Critical User Flows", () => {
  test.beforeEach(async ({ page }) => {
    // Set up test environment
    await page.goto("http://localhost:3000");
  });

  test("Homepage loads and displays correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/WeAreJobPilot/);
    await expect(page.locator("h1")).toContainText("Pilot your AI Career");
    await expect(page.locator("text=Get your Boarding Pass")).toBeVisible();
  });

  test("Navigation works across all pages", async ({ page }) => {
    // Test navbar navigation
    await page.click("text=Jobs");
    await expect(page).toHaveURL(/jobs/);
    
    await page.click("text=How it Works");
    await expect(page).toHaveURL(/how-it-works/);
    
    await page.click("text=Pricing");
    await expect(page).toHaveURL(/pricing/);
    
    await page.click("text=Dashboard");
    await expect(page).toHaveURL(/dashboard/);
  });

  test("Job search functionality", async ({ page }) => {
    await page.goto("http://localhost:3000/jobs");
    
    // Test search input
    await page.fill("input[placeholder*='engineer']", "React Developer");
    await page.click("button[type='submit']");
    
    // Should show job results
    await expect(page.locator(".job-card")).toHaveCountGreaterThan(0);
    
    // Test filter functionality
    await page.selectOption("select", "full-time");
    await expect(page.locator(".job-card")).toHaveCountGreaterThan(0);
  });

  test("Pricing page A/B testing", async ({ page }) => {
    await page.goto("http://localhost:3000/pricing");
    
    // Check that pricing tiers are displayed
    await expect(page.locator("text=Free (Buddy)")).toBeVisible();
    await expect(page.locator("text=Plus (Coach)")).toBeVisible();
    await expect(page.locator("text=Pro (Manager/Lawyer)")).toBeVisible();
    
    // Test CTA buttons
    const ctaButtons = page.locator("button").filter({ hasText: /Upgrade|Unlock/ });
    await expect(ctaButtons).toHaveCountGreaterThan(0);
    
    // Click on upgrade button
    await ctaButtons.first().click();
    // Should track funnel event (no redirect in test environment)
  });

  test("AI chat system", async ({ page }) => {
    await page.goto("http://localhost:3000/ai");
    
    // Check AI interface loads
    await expect(page.locator("h1")).toContainText("AI");
    
    // Test message input
    const messageInput = page.locator("input[type='text'], textarea");
    if (await messageInput.count() > 0) {
      await messageInput.fill("Test message");
      await page.click("button[type='submit']");
    }
  });

  test("Admin dashboard access", async ({ page }) => {
    await page.goto("http://localhost:3000/admin");
    
    // Should show admin interface
    await expect(page.locator("h1")).toContainText("Admin");
    
    // Test navigation tabs
    await expect(page.locator("text=Analytics")).toBeVisible();
    await expect(page.locator("text=Performance")).toBeVisible();
    await expect(page.locator("text=Conversion")).toBeVisible();
  });

  test("Health endpoints respond correctly", async ({ page }) => {
    // Test live health check
    const liveResponse = await page.request.get("http://localhost:3000/api/health/live");
    expect(liveResponse.status()).toBe(200);
    
    const liveData = await liveResponse.json();
    expect(liveData.status).toBe("ok");
    
    // Test version endpoint
    const versionResponse = await page.request.get("http://localhost:3000/api/health/version");
    expect(versionResponse.status()).toBe(200);
    
    const versionData = await versionResponse.json();
    expect(versionData.version).toBeDefined();
  });

  test("Responsive design on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto("http://localhost:3000");
    
    // Check that content is still accessible
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("text=Get your Boarding Pass")).toBeVisible();
    
    // Test mobile navigation
    await page.goto("http://localhost:3000/jobs");
    await expect(page.locator(".job-card")).toHaveCountGreaterThan(0);
  });

  test("Accessibility basics", async ({ page }) => {
    await page.goto("http://localhost:3000");
    
    // Check for proper heading structure
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    
    // Check for alt text on images
    const images = page.locator("img");
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
    
    // Check for proper form labels
    const inputs = page.locator("input, textarea, select");
    const inputCount = await inputs.count();
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toHaveCount(1);
      }
    }
  });

  test("Error handling", async ({ page }) => {
    // Test 404 page
    await page.goto("http://localhost:3000/nonexistent-page");
    await expect(page.locator("h1")).toContainText("404");
    
    // Test invalid API endpoint
    const response = await page.request.get("http://localhost:3000/api/invalid");
    expect(response.status()).toBe(404);
  });

  test("Performance basics", async ({ page }) => {
    // Measure page load time
    const startTime = Date.now();
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check for console errors
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    expect(errors).toHaveLength(0);
  });
});





