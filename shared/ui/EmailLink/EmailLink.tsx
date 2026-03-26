export const EmailLink = ({ className }: { className?: string }) => (
	<a
		href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
		className={`inline-block text-blue-500 hover:text-blue-600 active:text-blue-400 ${className}`}
	>
		{process.env.NEXT_PUBLIC_CONTACT_EMAIL}
	</a>
);
