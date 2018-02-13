import  { required, length } from './validator';
import Validator from './validator';

describe("Validation library", () => {
  describe("presence", () => {
    let validator = null;
    let field = null;
   
    beforeEach(() => {
      validator = required();

      field = {
        value: "",
        valid: true,
        error: null
      }
    });

    it("should fail if the field is an empty string", () => {
      field.value = '';
      const result = validator(field);
      
      expect(result.valid).to.equal(false);
      expect(result.error).to.equal("is required");
    });

    it("should trim the field value", () => {
      field.value = '    ';
      const result = validator(field);
      
      expect(result.valid).to.equal(false);
      expect(result.error).to.equal("is required");
    });

    it("should pass if the field is non-empty", () => {
      field.value = 'a';
      const result = validator(field);
      
      expect(result.valid).to.equal(true);
      expect(result.error).to.null;
    });
  });

  describe("length", () => {
    let validator = null;
    let field = null;

    beforeEach(() => {
      validator = length(10);

      field = {
        value: "waytoolong!",
        valid: true,
        error: null
      }
    });

    it("should fail if the expression is less than length", () => {
      field.value = "123456789";
      validator = length(field.value.length + 1);
      
      const result = validator(field);

      expect(result.valid).to.equal(true);
      expect(result.error).to.equal(null);
    });

    it("should pass if the expression is an equal length", () => {
      field.value = "123456789";
      validator = length(field.value.length);
      
      const result = validator(field);

      expect(result.valid).to.equal(true);
      expect(result.error).to.equal(null);
    });
  
    it("should pass if the expression is an longer", () => {
      field.value = "123456789";
      validator = length(field.value.length - 1);
      
      const result = validator(field);

      expect(result.valid).to.equal(false);
      expect(result.error).to.equal('is too long (Max is ' + (field.value.length - 1) + ')');
    });
  });

  describe("Validator", () => {
    let alwaysValid = (obj) => {
      return obj;
    };

    let alwaysInvalid = (obj) => {
      obj = Object.assign({}, obj);
      obj.valid = false;
      obj.errors.push('is invalid');
      return obj;
    };

    let validators = [];

    let subject = (obj = { valid: true, errors: [] }) => {
      let validator = new Validator(validators);
      return validator.validate(obj);
    };

    describe("empty set", () => {
      it("returns a valid object", () => {
        expect(subject().valid).to.equal(true);
      });

      it("has an empty errors object", () => {
        expect(subject().errors).to.deep.equal([]);
      });
    });

    describe("all valid", () => {
      beforeEach(() => { validators = [ alwaysValid, alwaysValid, alwaysValid ]});

      it("returns a valid object", () => {
        expect(subject().valid).to.equal(true);
      });

      it("has an empty errors object", () => {
        expect(subject().errors).to.deep.equal([]);
      });
    });

    describe("invalid followed by a valid", () => {
      beforeEach(() => { validators = [ alwaysInvalid, alwaysValid ]});

      it("returns a invalid object", () => {
        expect(subject().valid).to.equal(false);
      });

      it("has an error entry for each failing validator", () => {
        expect(subject().errors).to.deep.equal([ "is invalid" ]);
      });
    });

    describe("valid followed by an invalid", () => {
      beforeEach(() => { validators = [ alwaysValid, alwaysInvalid ]});

      it("returns a invalid object", () => {
        expect(subject().valid).to.equal(false);
      });

      it("has an error entry for each failing validator", () => {
        expect(subject().errors).to.deep.equal([ "is invalid" ]);
      });
    });

    describe("all invalid", () => {
      beforeEach(() => { validators = [ alwaysInvalid, alwaysInvalid, alwaysInvalid ]});

      it("returns a invalid object", () => {
        expect(subject().valid).to.equal(false);
      });

      it("has an error entry for each failing validator", () => {
        expect(subject().errors).to.deep.equal([ "is invalid", "is invalid", "is invalid" ]);
      });
    });
  });
});
