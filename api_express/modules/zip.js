
const zip_arrays = (left, right) => {
    if (Array.isArray(left) && Array.isArray(right) && left.length === right.length) {
      return left.map((element, index) => [element, right[index]])
    } else {
      throw Error("type error or lengths are not the same between objects");
    }
  }

module.exports = zip_arrays