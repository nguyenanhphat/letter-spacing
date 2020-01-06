import toastr from 'toastr';

toastr.options.positionClass = 'toast-bottom-right';

const toastrSuccess = message => {
  return toastr.success(message);
};

const toastrFail = message => {
  return toastr.warning(message);
};

export { toastrSuccess, toastrFail };
