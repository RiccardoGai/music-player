export function createSnackBar(message: string, isError?: boolean) {
  const oldSnackBars = document.getElementById('snackbar')
  oldSnackBars && oldSnackBars.parentNode.removeChild(oldSnackBars)
  const snackbar = document.createElement('div')
  snackbar.setAttribute('id', 'snackbar')
  if (isError) {
    snackbar.innerHTML = `<div class="align-items-center"><i class="material-icons red m-r-s">warning</i>${message}</div>`
  } else {
    snackbar.innerHTML = `<div class="align-items-center"><i class="material-icons blue m-r-s">music_note</i>${message}</div>`
  }

  document.body.appendChild(snackbar)
  setTimeout(() => {
    snackbar && snackbar.parentNode && snackbar.parentNode.removeChild(snackbar)
  }, 8000)
}
