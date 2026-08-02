import { mssqlTable, int, nvarchar, tinyint, date, smallint, bigint, datetime2, index, unique, foreignKey, primaryKey, check } from "drizzle-orm/mssql-core"
import { sql } from "drizzle-orm"


export const categories = mssqlTable("Categories", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	name: nvarchar("Name", { length: 100 }).notNull(),
	description: nvarchar("Description", { length: 400 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_Categories"}),
	unique("UQ_Categories_Name").on(table.name)
]);

export const documents = mssqlTable("Documents", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	productionId: int("ProductionId").notNull().references(() => productions.id, { onDelete: "cascade" } ),
	originalFileName: nvarchar("OriginalFileName", { length: 260 }).notNull(),
	storageKey: nvarchar("StorageKey", { length: 400 }).notNull(),
	contentType: nvarchar("ContentType", { length: 100 }).notNull(),
	sizeBytes: bigint("SizeBytes", { mode: 'number' }),
	uploadedAt: datetime2("UploadedAt", { mode: 'string', precision: 7 }).default(sql`sysdatetime()`).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_Documents"}),
	unique("UQ_Documents_ProductionId").on(table.productionId)
]);

export const knowledgeAreas = mssqlTable("KnowledgeAreas", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	name: nvarchar("Name", { length: 100 }).notNull(),
	description: nvarchar("Description", { length: 400 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_KnowledgeAreas"}),
	unique("UQ_KnowledgeAreas_Name").on(table.name)
]);

export const majors = mssqlTable("Majors", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	name: nvarchar("Name", { length: 150 }).notNull(),
	description: nvarchar("Description", { length: 400 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_Majors"}),
	unique("UQ_Majors_Name").on(table.name)
]);

export const productionCoauthors = mssqlTable("ProductionCoauthors", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	productionId: int("ProductionId").notNull().references(() => productions.id, { onDelete: "cascade" } ),
	coauthorName: nvarchar("CoauthorName", { length: 150 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_ProductionCoauthors"}),
	index("IX_ProductionCoauthors_ProductionId").on(table.productionId),
]);

export const productions = mssqlTable("Productions", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	title: nvarchar("Title", { length: 300 }).notNull(),
	author: nvarchar("Author", { length: 150 }).notNull(),
	ownerId: int("OwnerId").notNull().references(() => users.id),
	productionTypeId: int("ProductionTypeId").notNull().references(() => productionTypes.id),
	categoryId: int("CategoryId").notNull().references(() => categories.id),
	knowledgeAreaId: int("KnowledgeAreaId").notNull().references(() => knowledgeAreas.id),
	researchTypeId: int("ResearchTypeId").notNull().references(() => researchTypes.id),
	majorId: int("MajorId").notNull().references(() => majors.id),
	researchLineId: int("ResearchLineId").notNull().references(() => researchLines.id),
	year: smallint("Year").notNull(),
	status: tinyint("Status").notNull(),
	summary: nvarchar("Summary", { length: 'max' }).notNull(),
	createdAt: date("CreatedAt", { mode: 'string' }).default(sql`CONVERT([date],getdate())`).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_Productions"}),
	index("IX_Productions_Author").on(table.author),
	index("IX_Productions_CategoryId").on(table.categoryId),
	index("IX_Productions_KnowledgeAreaId").on(table.knowledgeAreaId),
	index("IX_Productions_MajorId").on(table.majorId),
	index("IX_Productions_OwnerId").on(table.ownerId),
	index("IX_Productions_ProductionTypeId").on(table.productionTypeId),
	index("IX_Productions_ResearchLineId").on(table.researchLineId),
	index("IX_Productions_ResearchTypeId").on(table.researchTypeId),
	index("IX_Productions_Status").on(table.status),
	index("IX_Productions_Title").on(table.title),
	index("IX_Productions_Year").on(table.year),
	check("CK_Productions_Status", sql`([Status]>=(1) AND [Status]<=(4))`),
	check("CK_Productions_Year", sql`([Year]>=(2000) AND [Year]<=(2100))`),
]);

export const productionTechnologies = mssqlTable("ProductionTechnologies", {
	productionId: int("ProductionId").notNull().references(() => productions.id, { onDelete: "cascade" } ),
	technologyId: int("TechnologyId").notNull().references(() => technologies.id),
}, (table) => [
	primaryKey({ columns: [table.productionId, table.technologyId], name: "PK_ProductionTechnologies"}),
]);

export const productionTypes = mssqlTable("ProductionTypes", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	name: nvarchar("Name", { length: 100 }).notNull(),
	description: nvarchar("Description", { length: 400 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_ProductionTypes"}),
	unique("UQ_ProductionTypes_Name").on(table.name)
]);

export const researchLines = mssqlTable("ResearchLines", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	name: nvarchar("Name", { length: 150 }).notNull(),
	description: nvarchar("Description", { length: 400 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_ResearchLines"}),
	unique("UQ_ResearchLines_Name").on(table.name)
]);

export const researchTypes = mssqlTable("ResearchTypes", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	name: nvarchar("Name", { length: 100 }).notNull(),
	description: nvarchar("Description", { length: 400 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_ResearchTypes"}),
	unique("UQ_ResearchTypes_Name").on(table.name)
]);

export const technologies = mssqlTable("Technologies", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	name: nvarchar("Name", { length: 100 }).notNull(),
	description: nvarchar("Description", { length: 400 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_Technologies"}),
	unique("UQ_Technologies_Name").on(table.name)
]);

export const users = mssqlTable("Users", {
	id: int("Id").identity({ seed: 1 ,increment: 1 }),
	name: nvarchar("Name", { length: 150 }).notNull(),
	email: nvarchar("Email", { length: 150 }).notNull(),
	password: nvarchar("Password", { length: 255 }).notNull(),
	role: tinyint("Role").notNull(),
	status: tinyint("Status").notNull(),
	registeredAt: date("RegisteredAt", { mode: 'string' }).default(sql`CONVERT([date],getdate())`).notNull(),
}, (table) => [
	primaryKey({ columns: [table.id], name: "PK_Users"}),
	unique("UQ_Users_Email").on(table.email),
	check("CK_Users_Role", sql`([Role]>=(1) AND [Role]<=(5))`),
	check("CK_Users_Status", sql`([Status]>=(1) AND [Status]<=(2))`),
]);
