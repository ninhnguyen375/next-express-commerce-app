const styles = (
  <style jsx global>{`
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: rgb(241, 241, 241);
      min-height: 100vh;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }
    .bg-dark {
      background: rgb(51, 51, 63);
      color: white;
    }
    .text-white {
      color: #fff;
    }
    .full-height {
      height: 100%;
    }
    a {
      text-decoration: none;
      color: initial;
    }
    .fixed-left {
      position: fixed;
      top: 65px;
      left: 0;
      bottom: 0;
    }
    .mt-66 {
      margin-top: 66px;
    }
    .sidebar {
      background: rgb(48, 52, 58);
      position: fixed !important;
      top: 65px;
      left: 0;
      height: 100vh;
      z-index: 1000;
      display: block;
    }
    .App {
      margin-left: 166px;
      margin-top: 66px;
    }
    .hidden {
      display: none !important;
    }
    @media screen and (max-width: 599px) {
      .sidebar {
        display: none;
        top: 48px;
      }
      .App {
        margin-left: 0;
        margin-top: 48px;
      }
      .brand-title {
        font-size: 14px !important;
      }
      .brand-text {
        display: none;
      }
    }
    .brand-text {
      color: rgb(117, 117, 117);
    }
    .sidebar > a {
      color: rgb(221, 221, 221) !important;
    }
    .sidebar > a:hover {
      color: #fff !important;
    }
    .fadeIn {
      animation: fadeInKey;
      animation-duration: 1s;
    }
    @keyframes fadeInKey {
      from {
        opacity: 0;
        /* transform: scale(0.9); */
      }
      to {
        /* transform: scale(1); */
        opacity: 1;
      }
    }
  `}</style>
);

export default styles;
