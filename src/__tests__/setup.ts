// jsdom knows <dialog> but has no showModal() or close(). Just enough of both
// for the tests: they flip the `open` attribute, like the browser does.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
}
