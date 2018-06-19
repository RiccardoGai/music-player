export function createSnackBar(message: string, isError?: boolean): void {
  const oldSnackBars = document.getElementById('snackbar')
  if (oldSnackBars) {
    oldSnackBars.parentNode.removeChild(oldSnackBars)
  }
  const snackbar = document.createElement('div')
  snackbar.setAttribute('id', 'snackbar')
  snackbar.innerHTML = isError
    ? `<div class="align-items-center"><i class="material-icons red m-r-s">warning</i>${message}</div>`
    : `<div class="align-items-center"><i class="material-icons blue m-r-s">music_note</i>${message}</div>`

  document.body.appendChild(snackbar)
  setTimeout(() => {
    if (snackbar && snackbar.parentNode) {
      snackbar.parentNode.removeChild(snackbar)
    }
  }, 8000)
}
