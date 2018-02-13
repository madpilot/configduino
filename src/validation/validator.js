export function required() {
  return function(obj) {
    if((obj.value + "").trim() == "") {
      obj = Object.assign({}, obj, {
        valid: false,
        error: "is required"
      });
    }

    return obj;
  }
}

export function length(len) {
  return function(obj) {
    if((obj.value + "").trim().length > len) {
      obj = Object.assign({}, obj, {
        valid: false,
        error: "is too long (Max is " + len + ")"
      });
    }
    return obj;
  }
}

export default class Validator {
	constructor(validators) {
		this.validators = validators;
	}

	validate(obj) {
		obj = Object.assign({}, obj, {
			valid: true,
			error: null
		});

		for(var i = 0; i < this.validators.length; i++) {
			obj = this.validators[i](obj);
		}

		return obj;
	}
}
