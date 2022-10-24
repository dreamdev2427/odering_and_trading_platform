import Swal2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Swal = withReactContent(Swal2);

const BsSwal = withReactContent(
  Swal2.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger mx-2',
      icon: 'custom-icom-swal',
      title: 'custom-title-swal',
    },
    buttonsStyling: false,
  }),
);

export { Swal, BsSwal };
