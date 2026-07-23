# Cyber Skills Academy Landing Page

Updated package:
- CEH v13 course now links to Selar: https://selar.com/17t1043p18
- CEH intro video is included locally at assets/videos/ceh-intro.MP4
- SOC, NOC and AI thumbnails now display COMING SOON
- AI SVG XML error has been fixed

## Upload/update steps

From your project folder run:

```bash
git add .
git commit -m "Add CEH course link, intro video, and coming soon thumbnails"
git push
```

## Notes

- The CEH video file is large (~48 MB). GitHub supports files under 100 MB, so pushing from VS Code should work.
- The other three courses are currently marked Coming Soon. Later, you can replace those sections with real links and videos.

- The CEH intro video is also displayed in the hero section.

## Hero video autoplay

The hero CEH video now uses `autoplay`, `muted`, `loop`, and `playsinline`. Browsers generally require autoplaying videos to begin muted. Visitors can use the controls to enable sound.
