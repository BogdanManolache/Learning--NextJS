import { useEffect, useState } from 'react';

//
export function useFormState(action) {
  const [state, setState] = useState({ isLoading: false, error: null });

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ isLoading: true, error: null });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await action(formData);
    console.log(result);

    if (result?.isError) {
      setState({ isLoading: false, error: result });
    } else {
      form.reset();
      setState({ isLoading: false, error: null });
    }
  }

  return { state, handleSubmit };
}

//
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(function () {
    setIsClient(true);
  }, []);
  return isClient;
}
