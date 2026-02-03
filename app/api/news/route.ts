import { prisma } from '@/shared/lib/prisma';
import { getServerSession } from 'next-auth';
// import { authOptions } from '@/shared/lib/auth';
import { hasPermission } from '@/shared/lib/permissions';

export const GET = async () => {
	const news = await prisma.news.findMany({
		orderBy: { createdAt: 'desc' },
	});

	return new Response(JSON.stringify(news), { status: 200 });
};

export const POST = async (req: Request) => {
	const session = await getServerSession(authOptions);

	if (!session || !hasPermission(session.user.role, 'news:create')) {
		return new Response('Forbidden', { status: 403 });
	}

	const data = await req.json();

	const news = await prisma.news.create({
		data: {
			title: data.title,
			slug: data.slug,
			content: data.content,
			image: data.image ?? null,
			published: data.published ?? true,
			authorId: session.user.id,
		},
	});

	return new Response(JSON.stringify(news), { status: 201 });
};
