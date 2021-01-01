export function animate(callback: Function) {
    const animate = () => {
        callback();
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
}