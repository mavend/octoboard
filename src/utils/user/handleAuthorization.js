const handleAuthorization = (
  loginFunc,
  setError,
  setLoading,
  navigate,
  location,
  setSuccess = null
) => {
  return async () => {
    try {
      setError(null);
      setLoading(true);
      let from = { from: { pathname: "/" } };
      if (location.state && location.state.from) {
        from = { ...location.state.from };
      }

      await loginFunc();
      navigate(from, { replace: true });
    } catch (e) {
      setLoading(false);
      setError(e.message);
      return;
    }
    setLoading(false);
    if (setSuccess) {
      setSuccess();
    }
  };
};

export default handleAuthorization;
