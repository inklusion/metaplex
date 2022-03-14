interface WhitelistResult {
  state: number;
}

export const isWhitelisted = async (
  walledAddress: string | undefined,
): Promise<number> => {
  const request = { address: walledAddress };

  const resp = await fetch(
    'https://api.zoker.com/api/marketplace/whitelisted',
    {
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify(request),
      mode: 'no-cors',
    },
  );

  if (!resp.ok) {
    return Promise.reject(
      new Error(
        'Unable get whitelisted status. Please wait and then try again.',
      ),
    );
  }

  const result: WhitelistResult = await resp.json();

  return result.state;
};
