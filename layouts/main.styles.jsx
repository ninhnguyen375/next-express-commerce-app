export const MainStyles = (
  <style jsx global>{`
    .nav-link {
      display: block;
    }
    .scrollSmooth {
      scroll-behavior: smooth;
    }
    .full-height {
      min-height: 70vh;
    }
    .fadeIn {
      animation: fadeIn 0.7s;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `}</style>
);
