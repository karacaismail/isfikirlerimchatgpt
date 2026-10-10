type TableKeyEvent = Pick<
  KeyboardEvent,
  | 'target'
  | 'currentTarget'
  | 'altKey'
  | 'ctrlKey'
  | 'metaKey'
  | 'shiftKey'
  | 'key'
  | 'preventDefault'
>;

export function scrollTableWithKeyboard(event: TableKeyEvent) {
  const region = event.currentTarget;
  if (
    !(region instanceof HTMLElement) ||
    event.target !== region ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  )
    return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    region.scrollBy({
      left: region.clientWidth * (event.key === 'ArrowRight' ? 0.5 : -0.5),
      behavior: 'instant',
    });
  }
}
