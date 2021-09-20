export const ratingDesc = (index) => {
  switch (index) {
    case 1:
      return 'Poor';
    case 2:
      return 'Fair';
    case 3:
      return 'Average';
    case 4:
      return 'Good';
    case 5:
      return 'Great';
    default:
      break;
  }
};

export const sizeDesc = (index) => {
  switch (index) {
    case 1:
      return 'A size too small';
    case 2:
      return '1/2 a size too small';
    case 3:
      return 'Perfect';
    case 4:
      return '1/2 a size too big';
    case 5:
      return 'A size too wide';
    default:
      break;
  }
};

export const widthDesc = (index) => {
  switch (index) {
    case 1:
      return 'Too narrow';
    case 2:
      return 'Slightly narrow';
    case 3:
      return 'Perfect';
    case 4:
      return 'Slightly wide';
    case 5:
      return 'Too wide';
    default:
      break;
  }
};

export const comfortDesc = (index) => {
  switch (index) {
    case 1:
      return 'Uncomfortable';
    case 2:
      return 'Slightly uncomfortable';
    case 3:
      return 'Ok';
    case 4:
      return 'Comfortable';
    case 5:
      return 'Perfect';
    default:
      break;
  }
};

export const qualityDesc = (index) => {
  switch (index) {
    case 1:
      return 'Poor';
    case 2:
      return 'Below average';
    case 3:
      return 'Ok';
    case 4:
      return 'Comfortable';
    case 5:
      return 'Perfect';
    default:
      break;
  }
};

export const fitDesc = (index) => {
  switch (index) {
    case 1:
      return 'Runs tight';
    case 2:
      return 'Runs slightly tight';
    case 3:
      return 'Perfect';
    case 4:
      return 'Runs slightly long';
    case 5:
      return 'Runs long';
    default:
      break;
  }
};

export const lenDesc = (index) => {
  switch (index) {
    case 1:
      return 'Runs short';
    case 2:
      return 'Runs slightly short';
    case 3:
      return 'Perfect';
    case 4:
      return 'Runs slightly long';
    case 5:
      return 'Runs long';
    default:
      break;
  }
};

// const submitMessage = () => {
//   if (submitClick === true && errorMessage === false) {
//     return (
//       <>
//         <p>
//           Review Submitted!
//           {' '}
//           <i className="bi bi-check-circle" style={{ fontSize: '24px' }} />
//         </p>
//       </>
//     );
//   }
//   if (submitClick === false && errorMessage === true) {
//     return (
//       <>
//         <p className="error-message"><em><small>Please Fill out Required:</small></em></p>
//         <ValidationMessage state={state} />
//       </>
//     );
//   }
// };
