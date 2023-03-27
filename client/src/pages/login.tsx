import { useLogin } from '@refinedev/core';
import { useEffect, useRef } from 'react';
import { CredentialResponse } from '../interfaces/google';

import { yariga } from '../assets';

const googleId =
  '425447464627-0leepe2rvmbigo0nfujmump16h12oimq.apps.googleusercontent.com';

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined' || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: 'popup',
          client_id: googleId,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: 'filled_blue',
          size: 'medium',
          type: 'standard',
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div style={{ marginTop: '20px' }} ref={divRef} />;
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <img src={yariga} alt='yariga logo' />
        </div>
        <GoogleButton />
      </div>
    </div>
  );
};
