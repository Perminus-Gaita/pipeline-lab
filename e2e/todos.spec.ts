import { test, expect, type Page } from "@playwright/test";

// The store lives in server memory and is shared by all tests,
// so each test uses a unique title to avoid clashing with the others.
function uniqueTitle(label: string) {
  return `${label} ${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// Locators are lazy: they describe *how* to find an element and are
// re-resolved every time they are used, so it is safe to create them up front.
function todoPage(page: Page) {
  return {
    input: page.getByRole("textbox", { name: "Todo title" }),
    addButton: page.getByRole("button", { name: "Add" }),
    list: page.getByRole("list", { name: "Todos" }),
  };
}

// Every test.step below shows up as a named, collapsible group in
// UI mode (`pnpm test:e2e:ui`). Click a step to see the page as it was
// before and after it ran.

test("adds a todo by clicking Add", async ({ page }) => {
  const title = uniqueTitle("Click");
  const { input, addButton, list } = todoPage(page);

  await test.step("open the home page", async () => {
    await page.goto("/");
    await expect(input).toBeVisible();
  });

  await test.step(`type "${title}" into the input`, async () => {
    await input.fill(title);
    await expect(input).toHaveValue(title);
  });

  await test.step("click the Add button", async () => {
    await addButton.click();
  });

  await test.step("the todo appears in the list", async () => {
    await expect(list.getByText(title)).toBeVisible();
  });

  await test.step("the input is cleared for the next todo", async () => {
    await expect(input).toHaveValue("");
  });
});

test("adds a todo using only the keyboard", async ({ page }) => {
  const title = uniqueTitle("Keyboard");
  const { input, list } = todoPage(page);

  await test.step("open the home page", async () => {
    await page.goto("/");
    await expect(input).toBeVisible();
  });

  await test.step("press Tab until the input has focus", async () => {
    // Proves the input is reachable without a mouse.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      if (await input.evaluate((el) => el === document.activeElement)) break;
    }
    await expect(input).toBeFocused();
  });

  await test.step(`type "${title}" key by key`, async () => {
    // pressSequentially sends one key event per character, like a real user.
    // A short delay makes the typing visible when watching the browser.
    await input.pressSequentially(title, { delay: 30 });
    await expect(input).toHaveValue(title);
  });

  await test.step("press Enter to submit", async () => {
    await page.keyboard.press("Enter");
  });

  await test.step("the todo appears in the list", async () => {
    await expect(list.getByText(title)).toBeVisible();
  });
});

test("keeps todos after a reload (saved on the server)", async ({ page }) => {
  const title = uniqueTitle("Reload");
  const { input, addButton, list } = todoPage(page);

  await test.step("open the home page", async () => {
    await page.goto("/");
  });

  await test.step(`add "${title}"`, async () => {
    await input.fill(title);
    await addButton.click();
    await expect(list.getByText(title)).toBeVisible();
  });

  await test.step("reload the page", async () => {
    await page.reload();
  });

  await test.step("the todo is still there (loaded from the server)", async () => {
    await expect(list.getByText(title)).toBeVisible();
  });
});

test.describe("on a 320px screen", () => {
  test.use({ viewport: { width: 320, height: 640 } });

  test("has no horizontal scroll and can still add a todo", async ({ page }) => {
    const title = uniqueTitle("Mobile");
    const { input, addButton, list } = todoPage(page);

    await test.step("open the home page on a narrow screen", async () => {
      await page.goto("/");
      await expect(input).toBeVisible();
    });

    await test.step("the page is not wider than the screen", async () => {
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflows).toBe(false);
    });

    await test.step(`add "${title}"`, async () => {
      await input.fill(title);
      await addButton.click();
    });

    await test.step("the todo appears in the list", async () => {
      await expect(list.getByText(title)).toBeVisible();
    });
  });
});
