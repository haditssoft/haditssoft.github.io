const calcPos = (_a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, id) => {

    switch (id) {
      case 1:
        if (_a !== 0) return 0;
        break;
      case 2:
        if (_b !== 0) return _a;
        break;
      case 3:
        if (_c !== 0) return (_a + _b);
        break;
      case 4:
        if (_d !== 0) return (_a + _b + _c);
        break;
      case 5:
        if (_e !== 0) return (_a + _b + _c + _d);
        break;
      case 6:
        if (_f !== 0) return (_a + _b + _c + _d + _e);
        break;
      case 7:
        if (_g !== 0) return (_a + _b + _c + _d + _e + _f);
        break;
      case 8:
        if (_h !== 0) return (_a + _b + _c + _d + _e + _f + _g);
        break;
      case 9:
        if (_i !== 0) return (_a + _b + _c + _d + _e + _f + _g + _h);
        break;
      case 10:
        if (_j !== 0) return (_a + _b + _c + _d + _e + _f + _g + _h + _i);
        break;
      case 11:
        if (_k !== 0) return (_a + _b + _c + _d + _e + _f + _g + _h + _i + _j);
        break;
      case 12:
        if (_l !== 0) return (_a + _b + _c + _d + _e + _f + _g + _h + _i + _j + _k);
        break;
      case 13:
        if (_m !== 0) return (_a + _b + _c + _d + _e + _f + _g + _h + _i + _j + _k + _l);
        break;
      case 14:
        if (_n !== 0) return (_a + _b + _c + _d + _e + _f + _g + _h + _i + _j + _k + _l + _m);
        break;
      default:
        return (_a + _b + _c + _d + _e + _f + _g + _h + _i + _j + _k + _l + _m + _n - 1);
    };
};

export default calcPos;