let url = "https://mopsinc.com/";

// In Cloudflare Pages, use the unique preview URL if we are not on the production branch (master)
if (process.env.CF_PAGES === "1") {
  if (process.env.CF_PAGES_BRANCH !== "master") {
    url = process.env.CF_PAGES_URL || "https://web-mops-group.pages.dev/";
  }
} else {
  // Local development default fallback to preview URL so local builds can reference the active preview domain if needed,
  // or keep it to mopsinc.com. Let's default to the preview domain for general local dev testing of link sharing tags.
  url = "https://web-mops-group.pages.dev/";
}

if (!url.endsWith("/")) {
  url += "/";
}

module.exports = {
  name: "MOPS GROUP INC",
  title: "Restoration Services You Can Trust",
  tagline: "From Emergency to Restored",
  license: "Certified Restoration Professionals",
  email: "hello@mopsinc.com",
  phone: "(613) 329-8439",
  address: "41 Dussek St, Belleville, ON K8N 5R9",
  url: url,
  year: "2026"
};
