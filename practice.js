new Promise((resolveOuter) => {
    console.log("hi");
    resolveOuter(
      new Promise((resolveInner) => {
        console.log("inner function");
        setTimeout(resolveInner, 6000);
      })
    );
  });