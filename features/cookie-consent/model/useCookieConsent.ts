import { useEffect, useState } from 'react';

export const useCookieConsent = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const accepted = localStorage.getItem('cookie_consent');
		if (!accepted) setShow(true);
	}, []);

	const accept = () => {
		localStorage.setItem('cookie_consent', 'true');
		setShow(false);
	};

	return { show, accept };
};
