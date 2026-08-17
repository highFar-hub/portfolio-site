# H/F Portfolio — GitHub Pages package

This folder is the ready-to-upload static version of the portfolio. Upload **the contents of this folder** to the root of the `highFar-hub/portfolio-site` repository.

## Upload with GitHub Desktop (recommended)

This package has more than 100 files, so GitHub Desktop is much easier than browser upload.

1. In GitHub Desktop, choose **File → Clone repository**, select `highFar-hub/portfolio-site`, and choose any local destination.
2. Open the cloned folder in Explorer. Copy the **contents** of this package into that folder and allow overwrite when prompted.
3. Return to GitHub Desktop. Enter a summary such as `Publish portfolio`, click **Commit to main**, then **Push origin**.

## Enable GitHub Pages

1. Open `https://github.com/highFar-hub/portfolio-site` and go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then click **Save**.
4. GitHub will publish it in a few minutes at `https://highFar-hub.github.io/portfolio-site/`.

## Intentional omission

`video/show.webm` is not included because it is 100.11 MiB, over GitHub's 100 MiB single-file upload limit. The identity pager therefore keeps its image background in this package.

To restore that click-to-play background later, either compress `show.webm` below 100 MiB and place it at `video/show.webm`, or host it in Tencent COS and update the video URL in `script.js`.
