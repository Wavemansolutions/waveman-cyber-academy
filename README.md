# Cyber Skills Academy — Google Drive Video Version

This version shows a visible play button on every course card and loads each intro video from Google Drive directly inside the landing page.

## Add Google Drive videos

1. Upload each MP4 video to Google Drive.
2. Right-click the video and choose **Share**.
3. Under General access, choose **Anyone with the link** and **Viewer**.
4. Copy the link.
5. Open `script.js` and replace the five values inside `DRIVE_VIDEOS`.

Example:

```js
const DRIVE_VIDEOS = {
  overview: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
  ceh: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
  soc: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
  noc: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
  ai: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
};
```

The script extracts the file ID and loads:

```text
https://drive.google.com/file/d/FILE_ID/preview
```

## Add Selar links

In the same `script.js` file, replace the four placeholders inside `COURSE_LINKS`.

## Upload changes to GitHub

```bash
git add .
git commit -m "Add Google Drive course videos"
git push
```

Vercel will redeploy automatically after the push.

## Notes

- Do not upload the MP4 files to GitHub; Google Drive hosts them.
- Google Drive must be set to **Anyone with the link → Viewer** or visitors will see an access request.
- For high-traffic paid courses, a dedicated video platform is usually more reliable than Google Drive.
