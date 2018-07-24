export class Setter {

  setValue(data, field, type = 'string') {
    if (data[field] !== undefined && data[field] !== null) {

      switch (type) {
        case "float":
          this[field] = parseFloat(data[field]);
          break;

        case "int":
          this[field] = parseInt(data[field]);
          break;

        case "realtor":
          this[field].set(data[field]);
          break;

        case "date":
          this[field] = new Date(data[field]);
          break;

        default:
          this[field] = data[field];
          break;
      }

    }
  }

}
