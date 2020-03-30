const handleAuthorization = (loginFunc, setError, setLoading, history) => {
  return async () => {
    try {
      setLoading(true);
      let from = { from: { pathname: "/" } };
      if (history.location.state && history.location.state.from){
        from = {...history.location.state.from};
      }

      await loginFunc();
      history.replace(from);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
};

export default handleAuthorization;
