-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE [Categories] (
	[Id] int IDENTITY(1, 1),
	[Name] nvarchar(100) NOT NULL,
	[Description] nvarchar(400) NOT NULL,
	CONSTRAINT [PK_Categories] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_Categories_Name] UNIQUE([Name])
);
--> statement-breakpoint
CREATE TABLE [Documents] (
	[Id] int IDENTITY(1, 1),
	[ProductionId] int NOT NULL,
	[OriginalFileName] nvarchar(260) NOT NULL,
	[StorageKey] nvarchar(400) NOT NULL,
	[ContentType] nvarchar(100) NOT NULL,
	[SizeBytes] bigint,
	[UploadedAt] datetime2(7) NOT NULL CONSTRAINT [DF_Documents_UploadedAt] DEFAULT (sysdatetime()),
	CONSTRAINT [PK_Documents] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_Documents_ProductionId] UNIQUE([ProductionId])
);
--> statement-breakpoint
CREATE TABLE [KnowledgeAreas] (
	[Id] int IDENTITY(1, 1),
	[Name] nvarchar(100) NOT NULL,
	[Description] nvarchar(400) NOT NULL,
	CONSTRAINT [PK_KnowledgeAreas] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_KnowledgeAreas_Name] UNIQUE([Name])
);
--> statement-breakpoint
CREATE TABLE [Majors] (
	[Id] int IDENTITY(1, 1),
	[Name] nvarchar(150) NOT NULL,
	[Description] nvarchar(400) NOT NULL,
	CONSTRAINT [PK_Majors] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_Majors_Name] UNIQUE([Name])
);
--> statement-breakpoint
CREATE TABLE [ProductionCoauthors] (
	[Id] int IDENTITY(1, 1),
	[ProductionId] int NOT NULL,
	[CoauthorName] nvarchar(150) NOT NULL,
	CONSTRAINT [PK_ProductionCoauthors] PRIMARY KEY([Id])
);
--> statement-breakpoint
CREATE TABLE [Productions] (
	[Id] int IDENTITY(1, 1),
	[Title] nvarchar(300) NOT NULL,
	[Author] nvarchar(150) NOT NULL,
	[OwnerId] int NOT NULL,
	[ProductionTypeId] int NOT NULL,
	[CategoryId] int NOT NULL,
	[KnowledgeAreaId] int NOT NULL,
	[ResearchTypeId] int NOT NULL,
	[MajorId] int NOT NULL,
	[ResearchLineId] int NOT NULL,
	[Year] smallint NOT NULL,
	[Status] tinyint NOT NULL,
	[Summary] nvarchar(max) NOT NULL,
	[CreatedAt] date NOT NULL CONSTRAINT [DF_Productions_CreatedAt] DEFAULT (CONVERT([date],getdate())),
	CONSTRAINT [PK_Productions] PRIMARY KEY([Id]),
	CONSTRAINT [CK_Productions_Status] CHECK (([Status]>=(1) AND [Status]<=(4))),
	CONSTRAINT [CK_Productions_Year] CHECK (([Year]>=(2000) AND [Year]<=(2100)))
);
--> statement-breakpoint
CREATE TABLE [ProductionTechnologies] (
	[ProductionId] int,
	[TechnologyId] int,
	CONSTRAINT [PK_ProductionTechnologies] PRIMARY KEY([ProductionId],[TechnologyId])
);
--> statement-breakpoint
CREATE TABLE [ProductionTypes] (
	[Id] int IDENTITY(1, 1),
	[Name] nvarchar(100) NOT NULL,
	[Description] nvarchar(400) NOT NULL,
	CONSTRAINT [PK_ProductionTypes] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_ProductionTypes_Name] UNIQUE([Name])
);
--> statement-breakpoint
CREATE TABLE [ResearchLines] (
	[Id] int IDENTITY(1, 1),
	[Name] nvarchar(150) NOT NULL,
	[Description] nvarchar(400) NOT NULL,
	CONSTRAINT [PK_ResearchLines] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_ResearchLines_Name] UNIQUE([Name])
);
--> statement-breakpoint
CREATE TABLE [ResearchTypes] (
	[Id] int IDENTITY(1, 1),
	[Name] nvarchar(100) NOT NULL,
	[Description] nvarchar(400) NOT NULL,
	CONSTRAINT [PK_ResearchTypes] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_ResearchTypes_Name] UNIQUE([Name])
);
--> statement-breakpoint
CREATE TABLE [Technologies] (
	[Id] int IDENTITY(1, 1),
	[Name] nvarchar(100) NOT NULL,
	[Description] nvarchar(400) NOT NULL,
	CONSTRAINT [PK_Technologies] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_Technologies_Name] UNIQUE([Name])
);
--> statement-breakpoint
CREATE TABLE [Users] (
	[Id] int IDENTITY(1, 1),
	[Name] nvarchar(150) NOT NULL,
	[Email] nvarchar(150) NOT NULL,
	[Password] nvarchar(255) NOT NULL,
	[Role] tinyint NOT NULL,
	[Status] tinyint NOT NULL,
	[RegisteredAt] date NOT NULL CONSTRAINT [DF_Users_RegisteredAt] DEFAULT (CONVERT([date],getdate())),
	CONSTRAINT [PK_Users] PRIMARY KEY([Id]),
	CONSTRAINT [UQ_Users_Email] UNIQUE([Email]),
	CONSTRAINT [CK_Users_Role] CHECK (([Role]>=(1) AND [Role]<=(5))),
	CONSTRAINT [CK_Users_Status] CHECK (([Status]>=(1) AND [Status]<=(2)))
);
--> statement-breakpoint
ALTER TABLE [Documents] ADD CONSTRAINT [FK_Documents_Production] FOREIGN KEY ([ProductionId]) REFERENCES [Productions]([Id]) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE [ProductionCoauthors] ADD CONSTRAINT [FK_ProductionCoauthors_Production] FOREIGN KEY ([ProductionId]) REFERENCES [Productions]([Id]) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE [Productions] ADD CONSTRAINT [FK_Productions_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Categories]([Id]);--> statement-breakpoint
ALTER TABLE [Productions] ADD CONSTRAINT [FK_Productions_KnowledgeArea] FOREIGN KEY ([KnowledgeAreaId]) REFERENCES [KnowledgeAreas]([Id]);--> statement-breakpoint
ALTER TABLE [Productions] ADD CONSTRAINT [FK_Productions_Major] FOREIGN KEY ([MajorId]) REFERENCES [Majors]([Id]);--> statement-breakpoint
ALTER TABLE [Productions] ADD CONSTRAINT [FK_Productions_Owner] FOREIGN KEY ([OwnerId]) REFERENCES [Users]([Id]);--> statement-breakpoint
ALTER TABLE [Productions] ADD CONSTRAINT [FK_Productions_ProductionType] FOREIGN KEY ([ProductionTypeId]) REFERENCES [ProductionTypes]([Id]);--> statement-breakpoint
ALTER TABLE [Productions] ADD CONSTRAINT [FK_Productions_ResearchLine] FOREIGN KEY ([ResearchLineId]) REFERENCES [ResearchLines]([Id]);--> statement-breakpoint
ALTER TABLE [Productions] ADD CONSTRAINT [FK_Productions_ResearchType] FOREIGN KEY ([ResearchTypeId]) REFERENCES [ResearchTypes]([Id]);--> statement-breakpoint
ALTER TABLE [ProductionTechnologies] ADD CONSTRAINT [FK_ProductionTechnologies_Production] FOREIGN KEY ([ProductionId]) REFERENCES [Productions]([Id]) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE [ProductionTechnologies] ADD CONSTRAINT [FK_ProductionTechnologies_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [Technologies]([Id]);--> statement-breakpoint
CREATE INDEX [IX_ProductionCoauthors_ProductionId] ON [ProductionCoauthors] ([ProductionId]);--> statement-breakpoint
CREATE INDEX [IX_Productions_Author] ON [Productions] ([Author]);--> statement-breakpoint
CREATE INDEX [IX_Productions_CategoryId] ON [Productions] ([CategoryId]);--> statement-breakpoint
CREATE INDEX [IX_Productions_KnowledgeAreaId] ON [Productions] ([KnowledgeAreaId]);--> statement-breakpoint
CREATE INDEX [IX_Productions_MajorId] ON [Productions] ([MajorId]);--> statement-breakpoint
CREATE INDEX [IX_Productions_OwnerId] ON [Productions] ([OwnerId]);--> statement-breakpoint
CREATE INDEX [IX_Productions_ProductionTypeId] ON [Productions] ([ProductionTypeId]);--> statement-breakpoint
CREATE INDEX [IX_Productions_ResearchLineId] ON [Productions] ([ResearchLineId]);--> statement-breakpoint
CREATE INDEX [IX_Productions_ResearchTypeId] ON [Productions] ([ResearchTypeId]);--> statement-breakpoint
CREATE INDEX [IX_Productions_Status] ON [Productions] ([Status]);--> statement-breakpoint
CREATE INDEX [IX_Productions_Title] ON [Productions] ([Title]);--> statement-breakpoint
CREATE INDEX [IX_Productions_Year] ON [Productions] ([Year]);
*/