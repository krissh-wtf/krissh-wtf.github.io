(() => {
  const PROMPT = "kri:~> ";
  const FINAL = "ssh wtf";
  const CURSOR = "▌";
  const STATIC = PROMPT + FINAL + " " + CURSOR;

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.title = STATIC;
    return;
  }

  let text = "";
  let last = "";

  const render = (cursor) => {
    const title = PROMPT + text + cursor;
    if (title !== last) document.title = last = title;
  };

  const showStatic = () => {
    document.title = last = STATIC;
  };

  const tick = (ms) =>
    new Promise((resolve, reject) =>
      setTimeout(() => (document.hidden ? reject() : resolve()), ms)
    );

  const waitVisible = () =>
    new Promise((resolve) => {
      const onChange = () => {
        if (document.hidden) return;
        document.removeEventListener("visibilitychange", onChange);
        resolve();
      };
      document.addEventListener("visibilitychange", onChange);
    });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) showStatic();
  });

  const actions = {
    async type(str) {
      for (const ch of str) {
        text += ch;
        render(CURSOR);
        await tick(100 + Math.random() * 120);
      }
    },
    async del(n, ms = 150) {
      for (let i = 0; i < n; i++) {
        text = text.slice(0, -1);
        render(CURSOR);
        await tick(ms);
      }
    },
    async blink(n, ms = 500) {
      for (let i = 0; i < n; i++) {
        render(CURSOR);
        await tick(ms);
        render("");
        await tick(ms);
      }
    },
  };

  const steps = [
    ["blink", 2],
    ["type", "ssh wft"],
    ["blink", 2, 350],
    ["del", 2],
    ["type", "tf"],
    ["blink", 4],
    ["del", FINAL.length, 60],
  ];

  (async () => {
    while (true) {
      if (document.hidden) {
        showStatic();
        await waitVisible();
      }
      text = "";
      try {
        for (const [action, ...args] of steps) await actions[action](...args);
      } catch {
        // wsh wsh wsh wsh
      }
    }
  })();
})();