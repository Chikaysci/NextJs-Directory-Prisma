type LinkType = {
	id: string;
	title: string;
	description: string;
	userId: string;
	categoryId: string;
	company_name: string;
	company_logo: string;
	screenshot: string;
	approved: boolean;
	featured: boolean;
	from_vnoc: boolean;
	approved_by: string;
	
	archivedAt: Date | null;
	deletedAt: Date | null;
	favoritedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};

export default LinkType;
