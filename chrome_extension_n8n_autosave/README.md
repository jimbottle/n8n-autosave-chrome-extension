# n8n Auto-Save Button Clicker

Automatically clicks the Save button in the n8n editor at a user-defined interval.

## Features
- Auto-clicks the Save button in n8n workflows
- User-selectable interval (1–180 minutes, default 5)
- Options page for easy configuration
- Works on all n8n instances (cloud or self-hosted)
- Minimal permissions, Manifest V3

## Install
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the `chrome_extension_n8n_autosave` folder.
5. The extension icon will appear in your toolbar.

## Usage
1. Open any n8n workflow page (`*/workflow/*`).
2. The extension will auto-click the Save button at the configured interval.
3. To change the interval:
   - Right-click the extension icon > **Options**
   - Enter a value (1–180 minutes) and click Save
   - Changes take effect immediately (no reload needed)
4. Check the JavaScript console for debug logs.

## Testing
- Open an n8n workflow and watch the Save button.
- Check the console for `[n8n-autosave]` logs.
- Try changing the interval in the options page and verify the new timing.

## File Structure
- `manifest.json` — Chrome extension manifest (MV3)
- `background.js` — Service worker (alarm, messaging)
- `contentScript.js` — Auto-click logic
- `options.html` / `options.js` — Options UI
- `icons/` — Placeholder icons (16/32/48/128)

## Notes
- No data is sent externally; all settings are stored in `chrome.storage.sync`.
- Requires permission for all n8n workflow URLs: `*://*/workflow/*` (for maximum compatibility).
  - For faster Chrome Web Store approval, you may restrict this to your specific n8n domains in `manifest.json`.
- For feedback or issues, open a GitHub issue.

## Privacy Policy

This extension does not collect, store, or transmit any personal data. All settings are stored locally using `chrome.storage.sync`.

## Chrome Web Store Host Permissions Warning

If you see a warning about "Broad Host Permissions" when submitting to the Chrome Web Store, you can:
- Restrict `host_permissions` in your `manifest.json` to only the domains you use n8n on (e.g., `https://app.n8n.cloud/workflow/*`).
- Or, keep the wildcard for maximum compatibility, but be prepared for a longer review and provide a justification in your listing.

---

To package your extension for the Chrome Web Store, follow these steps:

---

### 1. **Prepare Your Files**

- Make sure your extension folder (`chrome_extension_n8n_autosave/`) contains:
  - `manifest.json`
  - `background.js`
  - `contentScript.js`
  - `options.html`
  - `options.js`
  - `icons/` (with 16, 32, 48, 128 PNGs)
  - `README.md` (optional, not uploaded to the store)

**Tip:**  
Double-check that your manifest and all files are correct, and that your icons are valid PNGs of the correct sizes.

---

### 2. **Remove Unnecessary Files**

- Only include files needed for the extension to run.
- Do **not** include `.DS_Store`, `.git`, or any development files.

---

### 3. **Create a ZIP Archive**

From your terminal, run:

```sh
cd /Users/evanray/Projects/chrome_extension_n8n_autosave
zip -r ../n8n_autosave_extension.zip . -x '*.DS_Store' -x '*.git*'
```

- This will create `n8n_autosave_extension.zip` containing your extension with all files at the root of the ZIP.

---

### 4. **Test Your ZIP**

- Go to `chrome://extensions`
- Remove any previous unpacked version.
- Click **Load unpacked** and select the unzipped folder (to test).
- Click **Pack extension** and select your folder (to test the ZIP process; this is optional).

---

### 5. **Create a Developer Account**

- Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- Pay the one-time developer registration fee if you haven’t already.

---

### 6. **Submit Your Extension**

1. Click **Add new item**.
2. Upload your `n8n_autosave_extension.zip`.
3. Fill out the listing:
   - **Name** and **Description** (from your manifest/README)
   - **Screenshots** (take screenshots of your extension in action)
   - **Icons** (128x128 PNG required)
   - **Category** and **Language**
   - **Privacy policy** (see above)
4. Complete the required fields and save.

---

### 7. **Publish**

- Click **Submit for review**.
- Google will review your extension (can take a few days).
- Respond to any feedback if required.

---

## **Tips for Approval**

- Make sure your extension does not use any forbidden APIs or permissions.
- Your description and screenshots should clearly explain what your extension does.
- If you use any third-party code, make sure you have the right to use it and mention it in your listing.
- Your icons must be original or you must have the rights to use them. 