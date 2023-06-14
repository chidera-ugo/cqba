export function setCaretPosition(id: string) {
  const elem = document.getElementById(id!) as any;
  elem?.focus();

  if (!!elem && elem.selectionStart === 0) {
    if (elem.value?.length === 1) {
      elem.setSelectionRange(1, 1);
    } else {
      elem.setSelectionRange(elem.value?.length, elem.value?.length);
    }
  }
}
