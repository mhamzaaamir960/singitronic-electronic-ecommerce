export const asyncHandler = function (fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(Number(error.code) || 500).json({
        status: false,
        message: error.message,
      });
    }
  };
};
