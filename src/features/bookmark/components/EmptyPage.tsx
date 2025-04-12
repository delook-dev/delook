export function EmptyPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center">
      <i className="text-[3rem] not-italic">👀</i>
      <h1 className="mb-2 text-2xl font-medium">아직 북마크된 글이 없어요</h1>
      <p className="text-base text-foreground/80">
        마음에 드는 글을 저장해두면 언제든 다시 볼 수 있어요!
      </p>
    </section>
  );
}
