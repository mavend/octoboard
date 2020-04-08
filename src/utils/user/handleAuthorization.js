const handleAuthorization = (loginFunc, setError, setLoading, history, setSuccess = null) => {
  return async () => {
    try {
      setError(null);
      setLoading(true);
      let from = { from: { pathname: "/" } };
      if (history.location.state && history.location.state.from) {
        from = { ...history.location.state.from };
      }

      await loginFunc();
      history.replace(from);
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
