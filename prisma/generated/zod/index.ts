import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const ExampleScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt']);

export const FragmentScalarFieldEnumSchema = z.enum(['id','name','description']);

export const LevelFragmentScalarFieldEnumSchema = z.enum(['levelId','fragmentId']);

export const LevelResultFragmentScalarFieldEnumSchema = z.enum(['levelResultId','fragmentId']);

export const LevelResultScalarFieldEnumSchema = z.enum(['id','userId','date']);

export const LevelScalarFieldEnumSchema = z.enum(['id','name','enablePractice','bpm','description','fragmentVisibleCount','duration','correctAnswers','cooldownTime']);

export const NoteFragmentScalarFieldEnumSchema = z.enum(['noteId','fragmentId']);

export const NoteScalarFieldEnumSchema = z.enum(['id','note','velocity','time','dur']);

export const PracticeFragmentScalarFieldEnumSchema = z.enum(['practiceResultId','fragmentId']);

export const PracticeResultScalarFieldEnumSchema = z.enum(['id','userId','date']);

export const SceneFragmentScalarFieldEnumSchema = z.enum(['sceneResultId','fragmentId']);

export const SceneResultScalarFieldEnumSchema = z.enum(['id','userId','date','correct','transposed','levelId']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// EXAMPLE SCHEMA
/////////////////////////////////////////

export const ExampleSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Example = z.infer<typeof ExampleSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// LEVEL SCHEMA
/////////////////////////////////////////

export const LevelSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  enablePractice: z.boolean(),
  bpm: z.number().int(),
  description: z.string(),
  fragmentVisibleCount: z.number().int(),
  duration: z.number().int(),
  correctAnswers: z.number().int(),
  cooldownTime: z.number().int(),
})

export type Level = z.infer<typeof LevelSchema>

/////////////////////////////////////////
// LEVEL FRAGMENT SCHEMA
/////////////////////////////////////////

export const LevelFragmentSchema = z.object({
  levelId: z.string(),
  fragmentId: z.string(),
})

export type LevelFragment = z.infer<typeof LevelFragmentSchema>

/////////////////////////////////////////
// FRAGMENT SCHEMA
/////////////////////////////////////////

export const FragmentSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
})

export type Fragment = z.infer<typeof FragmentSchema>

/////////////////////////////////////////
// NOTE SCHEMA
/////////////////////////////////////////

export const NoteSchema = z.object({
  id: z.string().cuid(),
  note: z.string(),
  velocity: z.number().int(),
  time: z.string(),
  dur: z.number().int(),
})

export type Note = z.infer<typeof NoteSchema>

/////////////////////////////////////////
// NOTE FRAGMENT SCHEMA
/////////////////////////////////////////

export const NoteFragmentSchema = z.object({
  noteId: z.string(),
  fragmentId: z.string(),
})

export type NoteFragment = z.infer<typeof NoteFragmentSchema>

/////////////////////////////////////////
// LEVEL RESULT FRAGMENT SCHEMA
/////////////////////////////////////////

export const LevelResultFragmentSchema = z.object({
  levelResultId: z.string(),
  fragmentId: z.string(),
})

export type LevelResultFragment = z.infer<typeof LevelResultFragmentSchema>

/////////////////////////////////////////
// PRACTICE FRAGMENT SCHEMA
/////////////////////////////////////////

export const PracticeFragmentSchema = z.object({
  practiceResultId: z.string(),
  fragmentId: z.string(),
})

export type PracticeFragment = z.infer<typeof PracticeFragmentSchema>

/////////////////////////////////////////
// SCENE FRAGMENT SCHEMA
/////////////////////////////////////////

export const SceneFragmentSchema = z.object({
  sceneResultId: z.string(),
  fragmentId: z.string(),
})

export type SceneFragment = z.infer<typeof SceneFragmentSchema>

/////////////////////////////////////////
// LEVEL RESULT SCHEMA
/////////////////////////////////////////

export const LevelResultSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  date: z.coerce.date(),
})

export type LevelResult = z.infer<typeof LevelResultSchema>

/////////////////////////////////////////
// PRACTICE RESULT SCHEMA
/////////////////////////////////////////

export const PracticeResultSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  date: z.coerce.date(),
})

export type PracticeResult = z.infer<typeof PracticeResultSchema>

/////////////////////////////////////////
// SCENE RESULT SCHEMA
/////////////////////////////////////////

export const SceneResultSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  date: z.coerce.date(),
  correct: z.boolean(),
  transposed: z.number().int(),
  levelId: z.string(),
})

export type SceneResult = z.infer<typeof SceneResultSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// EXAMPLE
//------------------------------------------------------

export const ExampleSelectSchema: z.ZodType<Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  levelResults: z.union([z.boolean(),z.lazy(() => LevelResultFindManyArgsSchema)]).optional(),
  practiceResults: z.union([z.boolean(),z.lazy(() => PracticeResultFindManyArgsSchema)]).optional(),
  sceneResults: z.union([z.boolean(),z.lazy(() => SceneResultFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  levelResults: z.boolean().optional(),
  practiceResults: z.boolean().optional(),
  sceneResults: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  levelResults: z.union([z.boolean(),z.lazy(() => LevelResultFindManyArgsSchema)]).optional(),
  practiceResults: z.union([z.boolean(),z.lazy(() => PracticeResultFindManyArgsSchema)]).optional(),
  sceneResults: z.union([z.boolean(),z.lazy(() => SceneResultFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// LEVEL
//------------------------------------------------------

export const LevelIncludeSchema: z.ZodType<Prisma.LevelInclude> = z.object({
  fragments: z.union([z.boolean(),z.lazy(() => LevelFragmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LevelCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LevelArgsSchema: z.ZodType<Prisma.LevelArgs> = z.object({
  select: z.lazy(() => LevelSelectSchema).optional(),
  include: z.lazy(() => LevelIncludeSchema).optional(),
}).strict();

export const LevelCountOutputTypeArgsSchema: z.ZodType<Prisma.LevelCountOutputTypeArgs> = z.object({
  select: z.lazy(() => LevelCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LevelCountOutputTypeSelectSchema: z.ZodType<Prisma.LevelCountOutputTypeSelect> = z.object({
  fragments: z.boolean().optional(),
}).strict();

export const LevelSelectSchema: z.ZodType<Prisma.LevelSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  enablePractice: z.boolean().optional(),
  bpm: z.boolean().optional(),
  description: z.boolean().optional(),
  fragmentVisibleCount: z.boolean().optional(),
  duration: z.boolean().optional(),
  correctAnswers: z.boolean().optional(),
  cooldownTime: z.boolean().optional(),
  fragments: z.union([z.boolean(),z.lazy(() => LevelFragmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LevelCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LEVEL FRAGMENT
//------------------------------------------------------

export const LevelFragmentIncludeSchema: z.ZodType<Prisma.LevelFragmentInclude> = z.object({
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  level: z.union([z.boolean(),z.lazy(() => LevelArgsSchema)]).optional(),
}).strict()

export const LevelFragmentArgsSchema: z.ZodType<Prisma.LevelFragmentArgs> = z.object({
  select: z.lazy(() => LevelFragmentSelectSchema).optional(),
  include: z.lazy(() => LevelFragmentIncludeSchema).optional(),
}).strict();

export const LevelFragmentSelectSchema: z.ZodType<Prisma.LevelFragmentSelect> = z.object({
  levelId: z.boolean().optional(),
  fragmentId: z.boolean().optional(),
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  level: z.union([z.boolean(),z.lazy(() => LevelArgsSchema)]).optional(),
}).strict()

// FRAGMENT
//------------------------------------------------------

export const FragmentIncludeSchema: z.ZodType<Prisma.FragmentInclude> = z.object({
  levels: z.union([z.boolean(),z.lazy(() => LevelFragmentFindManyArgsSchema)]).optional(),
  levelResults: z.union([z.boolean(),z.lazy(() => LevelResultFragmentFindManyArgsSchema)]).optional(),
  notes: z.union([z.boolean(),z.lazy(() => NoteFragmentFindManyArgsSchema)]).optional(),
  practiceResults: z.union([z.boolean(),z.lazy(() => PracticeFragmentFindManyArgsSchema)]).optional(),
  sceneResults: z.union([z.boolean(),z.lazy(() => SceneFragmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FragmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FragmentArgsSchema: z.ZodType<Prisma.FragmentArgs> = z.object({
  select: z.lazy(() => FragmentSelectSchema).optional(),
  include: z.lazy(() => FragmentIncludeSchema).optional(),
}).strict();

export const FragmentCountOutputTypeArgsSchema: z.ZodType<Prisma.FragmentCountOutputTypeArgs> = z.object({
  select: z.lazy(() => FragmentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FragmentCountOutputTypeSelectSchema: z.ZodType<Prisma.FragmentCountOutputTypeSelect> = z.object({
  levels: z.boolean().optional(),
  levelResults: z.boolean().optional(),
  notes: z.boolean().optional(),
  practiceResults: z.boolean().optional(),
  sceneResults: z.boolean().optional(),
}).strict();

export const FragmentSelectSchema: z.ZodType<Prisma.FragmentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  levels: z.union([z.boolean(),z.lazy(() => LevelFragmentFindManyArgsSchema)]).optional(),
  levelResults: z.union([z.boolean(),z.lazy(() => LevelResultFragmentFindManyArgsSchema)]).optional(),
  notes: z.union([z.boolean(),z.lazy(() => NoteFragmentFindManyArgsSchema)]).optional(),
  practiceResults: z.union([z.boolean(),z.lazy(() => PracticeFragmentFindManyArgsSchema)]).optional(),
  sceneResults: z.union([z.boolean(),z.lazy(() => SceneFragmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FragmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NOTE
//------------------------------------------------------

export const NoteIncludeSchema: z.ZodType<Prisma.NoteInclude> = z.object({
  fragments: z.union([z.boolean(),z.lazy(() => NoteFragmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NoteCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NoteArgsSchema: z.ZodType<Prisma.NoteArgs> = z.object({
  select: z.lazy(() => NoteSelectSchema).optional(),
  include: z.lazy(() => NoteIncludeSchema).optional(),
}).strict();

export const NoteCountOutputTypeArgsSchema: z.ZodType<Prisma.NoteCountOutputTypeArgs> = z.object({
  select: z.lazy(() => NoteCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NoteCountOutputTypeSelectSchema: z.ZodType<Prisma.NoteCountOutputTypeSelect> = z.object({
  fragments: z.boolean().optional(),
}).strict();

export const NoteSelectSchema: z.ZodType<Prisma.NoteSelect> = z.object({
  id: z.boolean().optional(),
  note: z.boolean().optional(),
  velocity: z.boolean().optional(),
  time: z.boolean().optional(),
  dur: z.boolean().optional(),
  fragments: z.union([z.boolean(),z.lazy(() => NoteFragmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NoteCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NOTE FRAGMENT
//------------------------------------------------------

export const NoteFragmentIncludeSchema: z.ZodType<Prisma.NoteFragmentInclude> = z.object({
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  note: z.union([z.boolean(),z.lazy(() => NoteArgsSchema)]).optional(),
}).strict()

export const NoteFragmentArgsSchema: z.ZodType<Prisma.NoteFragmentArgs> = z.object({
  select: z.lazy(() => NoteFragmentSelectSchema).optional(),
  include: z.lazy(() => NoteFragmentIncludeSchema).optional(),
}).strict();

export const NoteFragmentSelectSchema: z.ZodType<Prisma.NoteFragmentSelect> = z.object({
  noteId: z.boolean().optional(),
  fragmentId: z.boolean().optional(),
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  note: z.union([z.boolean(),z.lazy(() => NoteArgsSchema)]).optional(),
}).strict()

// LEVEL RESULT FRAGMENT
//------------------------------------------------------

export const LevelResultFragmentIncludeSchema: z.ZodType<Prisma.LevelResultFragmentInclude> = z.object({
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  levelResult: z.union([z.boolean(),z.lazy(() => LevelResultArgsSchema)]).optional(),
}).strict()

export const LevelResultFragmentArgsSchema: z.ZodType<Prisma.LevelResultFragmentArgs> = z.object({
  select: z.lazy(() => LevelResultFragmentSelectSchema).optional(),
  include: z.lazy(() => LevelResultFragmentIncludeSchema).optional(),
}).strict();

export const LevelResultFragmentSelectSchema: z.ZodType<Prisma.LevelResultFragmentSelect> = z.object({
  levelResultId: z.boolean().optional(),
  fragmentId: z.boolean().optional(),
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  levelResult: z.union([z.boolean(),z.lazy(() => LevelResultArgsSchema)]).optional(),
}).strict()

// PRACTICE FRAGMENT
//------------------------------------------------------

export const PracticeFragmentIncludeSchema: z.ZodType<Prisma.PracticeFragmentInclude> = z.object({
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  practiceResult: z.union([z.boolean(),z.lazy(() => PracticeResultArgsSchema)]).optional(),
}).strict()

export const PracticeFragmentArgsSchema: z.ZodType<Prisma.PracticeFragmentArgs> = z.object({
  select: z.lazy(() => PracticeFragmentSelectSchema).optional(),
  include: z.lazy(() => PracticeFragmentIncludeSchema).optional(),
}).strict();

export const PracticeFragmentSelectSchema: z.ZodType<Prisma.PracticeFragmentSelect> = z.object({
  practiceResultId: z.boolean().optional(),
  fragmentId: z.boolean().optional(),
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  practiceResult: z.union([z.boolean(),z.lazy(() => PracticeResultArgsSchema)]).optional(),
}).strict()

// SCENE FRAGMENT
//------------------------------------------------------

export const SceneFragmentIncludeSchema: z.ZodType<Prisma.SceneFragmentInclude> = z.object({
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  sceneResult: z.union([z.boolean(),z.lazy(() => SceneResultArgsSchema)]).optional(),
}).strict()

export const SceneFragmentArgsSchema: z.ZodType<Prisma.SceneFragmentArgs> = z.object({
  select: z.lazy(() => SceneFragmentSelectSchema).optional(),
  include: z.lazy(() => SceneFragmentIncludeSchema).optional(),
}).strict();

export const SceneFragmentSelectSchema: z.ZodType<Prisma.SceneFragmentSelect> = z.object({
  sceneResultId: z.boolean().optional(),
  fragmentId: z.boolean().optional(),
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
  sceneResult: z.union([z.boolean(),z.lazy(() => SceneResultArgsSchema)]).optional(),
}).strict()

// LEVEL RESULT
//------------------------------------------------------

export const LevelResultIncludeSchema: z.ZodType<Prisma.LevelResultInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  fragments: z.union([z.boolean(),z.lazy(() => LevelResultFragmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LevelResultCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LevelResultArgsSchema: z.ZodType<Prisma.LevelResultArgs> = z.object({
  select: z.lazy(() => LevelResultSelectSchema).optional(),
  include: z.lazy(() => LevelResultIncludeSchema).optional(),
}).strict();

export const LevelResultCountOutputTypeArgsSchema: z.ZodType<Prisma.LevelResultCountOutputTypeArgs> = z.object({
  select: z.lazy(() => LevelResultCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LevelResultCountOutputTypeSelectSchema: z.ZodType<Prisma.LevelResultCountOutputTypeSelect> = z.object({
  fragments: z.boolean().optional(),
}).strict();

export const LevelResultSelectSchema: z.ZodType<Prisma.LevelResultSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  date: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  fragments: z.union([z.boolean(),z.lazy(() => LevelResultFragmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LevelResultCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRACTICE RESULT
//------------------------------------------------------

export const PracticeResultIncludeSchema: z.ZodType<Prisma.PracticeResultInclude> = z.object({
  fragments: z.union([z.boolean(),z.lazy(() => PracticeFragmentFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PracticeResultCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PracticeResultArgsSchema: z.ZodType<Prisma.PracticeResultArgs> = z.object({
  select: z.lazy(() => PracticeResultSelectSchema).optional(),
  include: z.lazy(() => PracticeResultIncludeSchema).optional(),
}).strict();

export const PracticeResultCountOutputTypeArgsSchema: z.ZodType<Prisma.PracticeResultCountOutputTypeArgs> = z.object({
  select: z.lazy(() => PracticeResultCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PracticeResultCountOutputTypeSelectSchema: z.ZodType<Prisma.PracticeResultCountOutputTypeSelect> = z.object({
  fragments: z.boolean().optional(),
}).strict();

export const PracticeResultSelectSchema: z.ZodType<Prisma.PracticeResultSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  date: z.boolean().optional(),
  fragments: z.union([z.boolean(),z.lazy(() => PracticeFragmentFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PracticeResultCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SCENE RESULT
//------------------------------------------------------

export const SceneResultIncludeSchema: z.ZodType<Prisma.SceneResultInclude> = z.object({
  fragments: z.union([z.boolean(),z.lazy(() => SceneFragmentFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SceneResultCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SceneResultArgsSchema: z.ZodType<Prisma.SceneResultArgs> = z.object({
  select: z.lazy(() => SceneResultSelectSchema).optional(),
  include: z.lazy(() => SceneResultIncludeSchema).optional(),
}).strict();

export const SceneResultCountOutputTypeArgsSchema: z.ZodType<Prisma.SceneResultCountOutputTypeArgs> = z.object({
  select: z.lazy(() => SceneResultCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SceneResultCountOutputTypeSelectSchema: z.ZodType<Prisma.SceneResultCountOutputTypeSelect> = z.object({
  fragments: z.boolean().optional(),
}).strict();

export const SceneResultSelectSchema: z.ZodType<Prisma.SceneResultSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  date: z.boolean().optional(),
  correct: z.boolean().optional(),
  transposed: z.boolean().optional(),
  levelId: z.boolean().optional(),
  fragments: z.union([z.boolean(),z.lazy(() => SceneFragmentFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SceneResultCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ExampleWhereInputSchema: z.ZodType<Prisma.ExampleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExampleWhereInputSchema),z.lazy(() => ExampleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExampleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExampleWhereInputSchema),z.lazy(() => ExampleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ExampleOrderByWithRelationInputSchema: z.ZodType<Prisma.ExampleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExampleWhereUniqueInputSchema: z.ZodType<Prisma.ExampleWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ExampleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExampleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExampleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExampleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExampleMinOrderByAggregateInputSchema).optional()
}).strict();

export const ExampleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExampleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema),z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema),z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional()
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional()
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  levelResults: z.lazy(() => LevelResultListRelationFilterSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultListRelationFilterSchema).optional(),
  sceneResults: z.lazy(() => SceneResultListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultOrderByRelationAggregateInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultOrderByRelationAggregateInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional()
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LevelWhereInputSchema: z.ZodType<Prisma.LevelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelWhereInputSchema),z.lazy(() => LevelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelWhereInputSchema),z.lazy(() => LevelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enablePractice: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  bpm: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentVisibleCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  correctAnswers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cooldownTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fragments: z.lazy(() => LevelFragmentListRelationFilterSchema).optional()
}).strict();

export const LevelOrderByWithRelationInputSchema: z.ZodType<Prisma.LevelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enablePractice: z.lazy(() => SortOrderSchema).optional(),
  bpm: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  fragmentVisibleCount: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  fragments: z.lazy(() => LevelFragmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LevelWhereUniqueInputSchema: z.ZodType<Prisma.LevelWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const LevelOrderByWithAggregationInputSchema: z.ZodType<Prisma.LevelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enablePractice: z.lazy(() => SortOrderSchema).optional(),
  bpm: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  fragmentVisibleCount: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LevelCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LevelAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LevelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LevelMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LevelSumOrderByAggregateInputSchema).optional()
}).strict();

export const LevelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LevelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LevelScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enablePractice: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  bpm: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fragmentVisibleCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  duration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  correctAnswers: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cooldownTime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const LevelFragmentWhereInputSchema: z.ZodType<Prisma.LevelFragmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelFragmentWhereInputSchema),z.lazy(() => LevelFragmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelFragmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelFragmentWhereInputSchema),z.lazy(() => LevelFragmentWhereInputSchema).array() ]).optional(),
  levelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragment: z.union([ z.lazy(() => FragmentRelationFilterSchema),z.lazy(() => FragmentWhereInputSchema) ]).optional(),
  level: z.union([ z.lazy(() => LevelRelationFilterSchema),z.lazy(() => LevelWhereInputSchema) ]).optional(),
}).strict();

export const LevelFragmentOrderByWithRelationInputSchema: z.ZodType<Prisma.LevelFragmentOrderByWithRelationInput> = z.object({
  levelId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  fragment: z.lazy(() => FragmentOrderByWithRelationInputSchema).optional(),
  level: z.lazy(() => LevelOrderByWithRelationInputSchema).optional()
}).strict();

export const LevelFragmentWhereUniqueInputSchema: z.ZodType<Prisma.LevelFragmentWhereUniqueInput> = z.object({
  levelId_fragmentId: z.lazy(() => LevelFragmentLevelIdFragmentIdCompoundUniqueInputSchema).optional()
}).strict();

export const LevelFragmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.LevelFragmentOrderByWithAggregationInput> = z.object({
  levelId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LevelFragmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LevelFragmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LevelFragmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const LevelFragmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LevelFragmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LevelFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelFragmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  levelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FragmentWhereInputSchema: z.ZodType<Prisma.FragmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FragmentWhereInputSchema),z.lazy(() => FragmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FragmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FragmentWhereInputSchema),z.lazy(() => FragmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  levels: z.lazy(() => LevelFragmentListRelationFilterSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentListRelationFilterSchema).optional(),
  notes: z.lazy(() => NoteFragmentListRelationFilterSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentListRelationFilterSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentListRelationFilterSchema).optional()
}).strict();

export const FragmentOrderByWithRelationInputSchema: z.ZodType<Prisma.FragmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  levels: z.lazy(() => LevelFragmentOrderByRelationAggregateInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentOrderByRelationAggregateInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentOrderByRelationAggregateInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentOrderByRelationAggregateInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FragmentWhereUniqueInputSchema: z.ZodType<Prisma.FragmentWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FragmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.FragmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FragmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FragmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FragmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const FragmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FragmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const NoteWhereInputSchema: z.ZodType<Prisma.NoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  note: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  velocity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  time: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dur: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fragments: z.lazy(() => NoteFragmentListRelationFilterSchema).optional()
}).strict();

export const NoteOrderByWithRelationInputSchema: z.ZodType<Prisma.NoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  velocity: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  dur: z.lazy(() => SortOrderSchema).optional(),
  fragments: z.lazy(() => NoteFragmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const NoteWhereUniqueInputSchema: z.ZodType<Prisma.NoteWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const NoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.NoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  velocity: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  dur: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NoteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NoteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NoteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NoteSumOrderByAggregateInputSchema).optional()
}).strict();

export const NoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NoteScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  note: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  velocity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  time: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dur: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const NoteFragmentWhereInputSchema: z.ZodType<Prisma.NoteFragmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteFragmentWhereInputSchema),z.lazy(() => NoteFragmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteFragmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteFragmentWhereInputSchema),z.lazy(() => NoteFragmentWhereInputSchema).array() ]).optional(),
  noteId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragment: z.union([ z.lazy(() => FragmentRelationFilterSchema),z.lazy(() => FragmentWhereInputSchema) ]).optional(),
  note: z.union([ z.lazy(() => NoteRelationFilterSchema),z.lazy(() => NoteWhereInputSchema) ]).optional(),
}).strict();

export const NoteFragmentOrderByWithRelationInputSchema: z.ZodType<Prisma.NoteFragmentOrderByWithRelationInput> = z.object({
  noteId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  fragment: z.lazy(() => FragmentOrderByWithRelationInputSchema).optional(),
  note: z.lazy(() => NoteOrderByWithRelationInputSchema).optional()
}).strict();

export const NoteFragmentWhereUniqueInputSchema: z.ZodType<Prisma.NoteFragmentWhereUniqueInput> = z.object({
  noteId_fragmentId: z.lazy(() => NoteFragmentNoteIdFragmentIdCompoundUniqueInputSchema).optional()
}).strict();

export const NoteFragmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.NoteFragmentOrderByWithAggregationInput> = z.object({
  noteId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NoteFragmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NoteFragmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NoteFragmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const NoteFragmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NoteFragmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NoteFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteFragmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  noteId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LevelResultFragmentWhereInputSchema: z.ZodType<Prisma.LevelResultFragmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultFragmentWhereInputSchema),z.lazy(() => LevelResultFragmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultFragmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultFragmentWhereInputSchema),z.lazy(() => LevelResultFragmentWhereInputSchema).array() ]).optional(),
  levelResultId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragment: z.union([ z.lazy(() => FragmentRelationFilterSchema),z.lazy(() => FragmentWhereInputSchema) ]).optional(),
  levelResult: z.union([ z.lazy(() => LevelResultRelationFilterSchema),z.lazy(() => LevelResultWhereInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentOrderByWithRelationInputSchema: z.ZodType<Prisma.LevelResultFragmentOrderByWithRelationInput> = z.object({
  levelResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  fragment: z.lazy(() => FragmentOrderByWithRelationInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultOrderByWithRelationInputSchema).optional()
}).strict();

export const LevelResultFragmentWhereUniqueInputSchema: z.ZodType<Prisma.LevelResultFragmentWhereUniqueInput> = z.object({
  levelResultId_fragmentId: z.lazy(() => LevelResultFragmentLevelResultIdFragmentIdCompoundUniqueInputSchema).optional()
}).strict();

export const LevelResultFragmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.LevelResultFragmentOrderByWithAggregationInput> = z.object({
  levelResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LevelResultFragmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LevelResultFragmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LevelResultFragmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const LevelResultFragmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LevelResultFragmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelResultFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultFragmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelResultFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  levelResultId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PracticeFragmentWhereInputSchema: z.ZodType<Prisma.PracticeFragmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PracticeFragmentWhereInputSchema),z.lazy(() => PracticeFragmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PracticeFragmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PracticeFragmentWhereInputSchema),z.lazy(() => PracticeFragmentWhereInputSchema).array() ]).optional(),
  practiceResultId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragment: z.union([ z.lazy(() => FragmentRelationFilterSchema),z.lazy(() => FragmentWhereInputSchema) ]).optional(),
  practiceResult: z.union([ z.lazy(() => PracticeResultRelationFilterSchema),z.lazy(() => PracticeResultWhereInputSchema) ]).optional(),
}).strict();

export const PracticeFragmentOrderByWithRelationInputSchema: z.ZodType<Prisma.PracticeFragmentOrderByWithRelationInput> = z.object({
  practiceResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  fragment: z.lazy(() => FragmentOrderByWithRelationInputSchema).optional(),
  practiceResult: z.lazy(() => PracticeResultOrderByWithRelationInputSchema).optional()
}).strict();

export const PracticeFragmentWhereUniqueInputSchema: z.ZodType<Prisma.PracticeFragmentWhereUniqueInput> = z.object({
  practiceResultId_fragmentId: z.lazy(() => PracticeFragmentPracticeResultIdFragmentIdCompoundUniqueInputSchema).optional()
}).strict();

export const PracticeFragmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.PracticeFragmentOrderByWithAggregationInput> = z.object({
  practiceResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PracticeFragmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PracticeFragmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PracticeFragmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const PracticeFragmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PracticeFragmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PracticeFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => PracticeFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PracticeFragmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PracticeFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => PracticeFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  practiceResultId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SceneFragmentWhereInputSchema: z.ZodType<Prisma.SceneFragmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SceneFragmentWhereInputSchema),z.lazy(() => SceneFragmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SceneFragmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SceneFragmentWhereInputSchema),z.lazy(() => SceneFragmentWhereInputSchema).array() ]).optional(),
  sceneResultId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragment: z.union([ z.lazy(() => FragmentRelationFilterSchema),z.lazy(() => FragmentWhereInputSchema) ]).optional(),
  sceneResult: z.union([ z.lazy(() => SceneResultRelationFilterSchema),z.lazy(() => SceneResultWhereInputSchema) ]).optional(),
}).strict();

export const SceneFragmentOrderByWithRelationInputSchema: z.ZodType<Prisma.SceneFragmentOrderByWithRelationInput> = z.object({
  sceneResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  fragment: z.lazy(() => FragmentOrderByWithRelationInputSchema).optional(),
  sceneResult: z.lazy(() => SceneResultOrderByWithRelationInputSchema).optional()
}).strict();

export const SceneFragmentWhereUniqueInputSchema: z.ZodType<Prisma.SceneFragmentWhereUniqueInput> = z.object({
  sceneResultId_fragmentId: z.lazy(() => SceneFragmentSceneResultIdFragmentIdCompoundUniqueInputSchema).optional()
}).strict();

export const SceneFragmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.SceneFragmentOrderByWithAggregationInput> = z.object({
  sceneResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SceneFragmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SceneFragmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SceneFragmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const SceneFragmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SceneFragmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SceneFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => SceneFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SceneFragmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SceneFragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => SceneFragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sceneResultId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LevelResultWhereInputSchema: z.ZodType<Prisma.LevelResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultWhereInputSchema),z.lazy(() => LevelResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultWhereInputSchema),z.lazy(() => LevelResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  fragments: z.lazy(() => LevelResultFragmentListRelationFilterSchema).optional()
}).strict();

export const LevelResultOrderByWithRelationInputSchema: z.ZodType<Prisma.LevelResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  fragments: z.lazy(() => LevelResultFragmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LevelResultWhereUniqueInputSchema: z.ZodType<Prisma.LevelResultWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const LevelResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.LevelResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LevelResultCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LevelResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LevelResultMinOrderByAggregateInputSchema).optional()
}).strict();

export const LevelResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LevelResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PracticeResultWhereInputSchema: z.ZodType<Prisma.PracticeResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PracticeResultWhereInputSchema),z.lazy(() => PracticeResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PracticeResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PracticeResultWhereInputSchema),z.lazy(() => PracticeResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fragments: z.lazy(() => PracticeFragmentListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PracticeResultOrderByWithRelationInputSchema: z.ZodType<Prisma.PracticeResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  fragments: z.lazy(() => PracticeFragmentOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PracticeResultWhereUniqueInputSchema: z.ZodType<Prisma.PracticeResultWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const PracticeResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.PracticeResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PracticeResultCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PracticeResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PracticeResultMinOrderByAggregateInputSchema).optional()
}).strict();

export const PracticeResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PracticeResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PracticeResultScalarWhereWithAggregatesInputSchema),z.lazy(() => PracticeResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PracticeResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PracticeResultScalarWhereWithAggregatesInputSchema),z.lazy(() => PracticeResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SceneResultWhereInputSchema: z.ZodType<Prisma.SceneResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SceneResultWhereInputSchema),z.lazy(() => SceneResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SceneResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SceneResultWhereInputSchema),z.lazy(() => SceneResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  correct: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transposed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  levelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragments: z.lazy(() => SceneFragmentListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SceneResultOrderByWithRelationInputSchema: z.ZodType<Prisma.SceneResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  correct: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  levelId: z.lazy(() => SortOrderSchema).optional(),
  fragments: z.lazy(() => SceneFragmentOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SceneResultWhereUniqueInputSchema: z.ZodType<Prisma.SceneResultWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const SceneResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.SceneResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  correct: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  levelId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SceneResultCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SceneResultAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SceneResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SceneResultMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SceneResultSumOrderByAggregateInputSchema).optional()
}).strict();

export const SceneResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SceneResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SceneResultScalarWhereWithAggregatesInputSchema),z.lazy(() => SceneResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SceneResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SceneResultScalarWhereWithAggregatesInputSchema),z.lazy(() => SceneResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  correct: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  transposed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  levelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ExampleCreateInputSchema: z.ZodType<Prisma.ExampleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ExampleUncheckedCreateInputSchema: z.ZodType<Prisma.ExampleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ExampleUpdateInputSchema: z.ZodType<Prisma.ExampleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExampleUncheckedUpdateInputSchema: z.ZodType<Prisma.ExampleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExampleUpdateManyMutationInputSchema: z.ZodType<Prisma.ExampleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExampleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExampleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelCreateInputSchema: z.ZodType<Prisma.LevelCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  enablePractice: z.boolean(),
  bpm: z.number().int(),
  description: z.string(),
  fragmentVisibleCount: z.number().int(),
  duration: z.number().int(),
  correctAnswers: z.number().int(),
  cooldownTime: z.number().int(),
  fragments: z.lazy(() => LevelFragmentCreateNestedManyWithoutLevelInputSchema).optional()
}).strict();

export const LevelUncheckedCreateInputSchema: z.ZodType<Prisma.LevelUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  enablePractice: z.boolean(),
  bpm: z.number().int(),
  description: z.string(),
  fragmentVisibleCount: z.number().int(),
  duration: z.number().int(),
  correctAnswers: z.number().int(),
  cooldownTime: z.number().int(),
  fragments: z.lazy(() => LevelFragmentUncheckedCreateNestedManyWithoutLevelInputSchema).optional()
}).strict();

export const LevelUpdateInputSchema: z.ZodType<Prisma.LevelUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enablePractice: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bpm: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentVisibleCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => LevelFragmentUpdateManyWithoutLevelNestedInputSchema).optional()
}).strict();

export const LevelUncheckedUpdateInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enablePractice: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bpm: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentVisibleCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => LevelFragmentUncheckedUpdateManyWithoutLevelNestedInputSchema).optional()
}).strict();

export const LevelUpdateManyMutationInputSchema: z.ZodType<Prisma.LevelUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enablePractice: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bpm: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentVisibleCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enablePractice: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bpm: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentVisibleCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelFragmentCreateInputSchema: z.ZodType<Prisma.LevelFragmentCreateInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutLevelsInputSchema),
  level: z.lazy(() => LevelCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const LevelFragmentUncheckedCreateInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedCreateInput> = z.object({
  levelId: z.string(),
  fragmentId: z.string()
}).strict();

export const LevelFragmentUpdateInputSchema: z.ZodType<Prisma.LevelFragmentUpdateInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutLevelsNestedInputSchema).optional(),
  level: z.lazy(() => LevelUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const LevelFragmentUncheckedUpdateInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedUpdateInput> = z.object({
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelFragmentUpdateManyMutationInputSchema: z.ZodType<Prisma.LevelFragmentUpdateManyMutationInput> = z.object({
}).strict();

export const LevelFragmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedUpdateManyInput> = z.object({
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FragmentCreateInputSchema: z.ZodType<Prisma.FragmentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentUpdateInputSchema: z.ZodType<Prisma.FragmentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUpdateManyMutationInputSchema: z.ZodType<Prisma.FragmentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FragmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteCreateInputSchema: z.ZodType<Prisma.NoteCreateInput> = z.object({
  id: z.string().cuid().optional(),
  note: z.string(),
  velocity: z.number().int(),
  time: z.string(),
  dur: z.number().int(),
  fragments: z.lazy(() => NoteFragmentCreateNestedManyWithoutNoteInputSchema).optional()
}).strict();

export const NoteUncheckedCreateInputSchema: z.ZodType<Prisma.NoteUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  note: z.string(),
  velocity: z.number().int(),
  time: z.string(),
  dur: z.number().int(),
  fragments: z.lazy(() => NoteFragmentUncheckedCreateNestedManyWithoutNoteInputSchema).optional()
}).strict();

export const NoteUpdateInputSchema: z.ZodType<Prisma.NoteUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  velocity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dur: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => NoteFragmentUpdateManyWithoutNoteNestedInputSchema).optional()
}).strict();

export const NoteUncheckedUpdateInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  velocity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dur: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => NoteFragmentUncheckedUpdateManyWithoutNoteNestedInputSchema).optional()
}).strict();

export const NoteUpdateManyMutationInputSchema: z.ZodType<Prisma.NoteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  velocity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dur: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  velocity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dur: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteFragmentCreateInputSchema: z.ZodType<Prisma.NoteFragmentCreateInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutNotesInputSchema),
  note: z.lazy(() => NoteCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const NoteFragmentUncheckedCreateInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedCreateInput> = z.object({
  noteId: z.string(),
  fragmentId: z.string()
}).strict();

export const NoteFragmentUpdateInputSchema: z.ZodType<Prisma.NoteFragmentUpdateInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutNotesNestedInputSchema).optional(),
  note: z.lazy(() => NoteUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const NoteFragmentUncheckedUpdateInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedUpdateInput> = z.object({
  noteId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteFragmentUpdateManyMutationInputSchema: z.ZodType<Prisma.NoteFragmentUpdateManyMutationInput> = z.object({
}).strict();

export const NoteFragmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedUpdateManyInput> = z.object({
  noteId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentCreateInputSchema: z.ZodType<Prisma.LevelResultFragmentCreateInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutLevelResultsInputSchema),
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const LevelResultFragmentUncheckedCreateInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedCreateInput> = z.object({
  levelResultId: z.string(),
  fragmentId: z.string()
}).strict();

export const LevelResultFragmentUpdateInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutLevelResultsNestedInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const LevelResultFragmentUncheckedUpdateInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedUpdateInput> = z.object({
  levelResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentUpdateManyMutationInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateManyMutationInput> = z.object({
}).strict();

export const LevelResultFragmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedUpdateManyInput> = z.object({
  levelResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeFragmentCreateInputSchema: z.ZodType<Prisma.PracticeFragmentCreateInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutPracticeResultsInputSchema),
  practiceResult: z.lazy(() => PracticeResultCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const PracticeFragmentUncheckedCreateInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedCreateInput> = z.object({
  practiceResultId: z.string(),
  fragmentId: z.string()
}).strict();

export const PracticeFragmentUpdateInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutPracticeResultsNestedInputSchema).optional(),
  practiceResult: z.lazy(() => PracticeResultUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const PracticeFragmentUncheckedUpdateInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedUpdateInput> = z.object({
  practiceResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeFragmentUpdateManyMutationInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateManyMutationInput> = z.object({
}).strict();

export const PracticeFragmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedUpdateManyInput> = z.object({
  practiceResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneFragmentCreateInputSchema: z.ZodType<Prisma.SceneFragmentCreateInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutSceneResultsInputSchema),
  sceneResult: z.lazy(() => SceneResultCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const SceneFragmentUncheckedCreateInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedCreateInput> = z.object({
  sceneResultId: z.string(),
  fragmentId: z.string()
}).strict();

export const SceneFragmentUpdateInputSchema: z.ZodType<Prisma.SceneFragmentUpdateInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutSceneResultsNestedInputSchema).optional(),
  sceneResult: z.lazy(() => SceneResultUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const SceneFragmentUncheckedUpdateInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedUpdateInput> = z.object({
  sceneResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneFragmentUpdateManyMutationInputSchema: z.ZodType<Prisma.SceneFragmentUpdateManyMutationInput> = z.object({
}).strict();

export const SceneFragmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedUpdateManyInput> = z.object({
  sceneResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultCreateInputSchema: z.ZodType<Prisma.LevelResultCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutLevelResultsInputSchema),
  fragments: z.lazy(() => LevelResultFragmentCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUncheckedCreateInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  fragments: z.lazy(() => LevelResultFragmentUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUpdateInputSchema: z.ZodType<Prisma.LevelResultUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLevelResultsNestedInputSchema).optional(),
  fragments: z.lazy(() => LevelResultFragmentUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUpdateManyMutationInputSchema: z.ZodType<Prisma.LevelResultUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeResultCreateInputSchema: z.ZodType<Prisma.PracticeResultCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  fragments: z.lazy(() => PracticeFragmentCreateNestedManyWithoutPracticeResultInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPracticeResultsInputSchema)
}).strict();

export const PracticeResultUncheckedCreateInputSchema: z.ZodType<Prisma.PracticeResultUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  fragments: z.lazy(() => PracticeFragmentUncheckedCreateNestedManyWithoutPracticeResultInputSchema).optional()
}).strict();

export const PracticeResultUpdateInputSchema: z.ZodType<Prisma.PracticeResultUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => PracticeFragmentUpdateManyWithoutPracticeResultNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPracticeResultsNestedInputSchema).optional()
}).strict();

export const PracticeResultUncheckedUpdateInputSchema: z.ZodType<Prisma.PracticeResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutPracticeResultNestedInputSchema).optional()
}).strict();

export const PracticeResultUpdateManyMutationInputSchema: z.ZodType<Prisma.PracticeResultUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PracticeResultUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneResultCreateInputSchema: z.ZodType<Prisma.SceneResultCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  correct: z.boolean(),
  transposed: z.number().int(),
  levelId: z.string(),
  fragments: z.lazy(() => SceneFragmentCreateNestedManyWithoutSceneResultInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSceneResultsInputSchema)
}).strict();

export const SceneResultUncheckedCreateInputSchema: z.ZodType<Prisma.SceneResultUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  correct: z.boolean(),
  transposed: z.number().int(),
  levelId: z.string(),
  fragments: z.lazy(() => SceneFragmentUncheckedCreateNestedManyWithoutSceneResultInputSchema).optional()
}).strict();

export const SceneResultUpdateInputSchema: z.ZodType<Prisma.SceneResultUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => SceneFragmentUpdateManyWithoutSceneResultNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSceneResultsNestedInputSchema).optional()
}).strict();

export const SceneResultUncheckedUpdateInputSchema: z.ZodType<Prisma.SceneResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutSceneResultNestedInputSchema).optional()
}).strict();

export const SceneResultUpdateManyMutationInputSchema: z.ZodType<Prisma.SceneResultUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SceneResultUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ExampleCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExampleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExampleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExampleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExampleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExampleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const LevelResultListRelationFilterSchema: z.ZodType<Prisma.LevelResultListRelationFilter> = z.object({
  every: z.lazy(() => LevelResultWhereInputSchema).optional(),
  some: z.lazy(() => LevelResultWhereInputSchema).optional(),
  none: z.lazy(() => LevelResultWhereInputSchema).optional()
}).strict();

export const PracticeResultListRelationFilterSchema: z.ZodType<Prisma.PracticeResultListRelationFilter> = z.object({
  every: z.lazy(() => PracticeResultWhereInputSchema).optional(),
  some: z.lazy(() => PracticeResultWhereInputSchema).optional(),
  none: z.lazy(() => PracticeResultWhereInputSchema).optional()
}).strict();

export const SceneResultListRelationFilterSchema: z.ZodType<Prisma.SceneResultListRelationFilter> = z.object({
  every: z.lazy(() => SceneResultWhereInputSchema).optional(),
  some: z.lazy(() => SceneResultWhereInputSchema).optional(),
  none: z.lazy(() => SceneResultWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LevelResultOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PracticeResultOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PracticeResultOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneResultOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SceneResultOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const LevelFragmentListRelationFilterSchema: z.ZodType<Prisma.LevelFragmentListRelationFilter> = z.object({
  every: z.lazy(() => LevelFragmentWhereInputSchema).optional(),
  some: z.lazy(() => LevelFragmentWhereInputSchema).optional(),
  none: z.lazy(() => LevelFragmentWhereInputSchema).optional()
}).strict();

export const LevelFragmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LevelFragmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelCountOrderByAggregateInputSchema: z.ZodType<Prisma.LevelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enablePractice: z.lazy(() => SortOrderSchema).optional(),
  bpm: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  fragmentVisibleCount: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LevelAvgOrderByAggregateInput> = z.object({
  bpm: z.lazy(() => SortOrderSchema).optional(),
  fragmentVisibleCount: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LevelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enablePractice: z.lazy(() => SortOrderSchema).optional(),
  bpm: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  fragmentVisibleCount: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelMinOrderByAggregateInputSchema: z.ZodType<Prisma.LevelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enablePractice: z.lazy(() => SortOrderSchema).optional(),
  bpm: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  fragmentVisibleCount: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelSumOrderByAggregateInputSchema: z.ZodType<Prisma.LevelSumOrderByAggregateInput> = z.object({
  bpm: z.lazy(() => SortOrderSchema).optional(),
  fragmentVisibleCount: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FragmentRelationFilterSchema: z.ZodType<Prisma.FragmentRelationFilter> = z.object({
  is: z.lazy(() => FragmentWhereInputSchema).optional(),
  isNot: z.lazy(() => FragmentWhereInputSchema).optional()
}).strict();

export const LevelRelationFilterSchema: z.ZodType<Prisma.LevelRelationFilter> = z.object({
  is: z.lazy(() => LevelWhereInputSchema).optional(),
  isNot: z.lazy(() => LevelWhereInputSchema).optional()
}).strict();

export const LevelFragmentLevelIdFragmentIdCompoundUniqueInputSchema: z.ZodType<Prisma.LevelFragmentLevelIdFragmentIdCompoundUniqueInput> = z.object({
  levelId: z.string(),
  fragmentId: z.string()
}).strict();

export const LevelFragmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.LevelFragmentCountOrderByAggregateInput> = z.object({
  levelId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelFragmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LevelFragmentMaxOrderByAggregateInput> = z.object({
  levelId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelFragmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.LevelFragmentMinOrderByAggregateInput> = z.object({
  levelId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultFragmentListRelationFilterSchema: z.ZodType<Prisma.LevelResultFragmentListRelationFilter> = z.object({
  every: z.lazy(() => LevelResultFragmentWhereInputSchema).optional(),
  some: z.lazy(() => LevelResultFragmentWhereInputSchema).optional(),
  none: z.lazy(() => LevelResultFragmentWhereInputSchema).optional()
}).strict();

export const NoteFragmentListRelationFilterSchema: z.ZodType<Prisma.NoteFragmentListRelationFilter> = z.object({
  every: z.lazy(() => NoteFragmentWhereInputSchema).optional(),
  some: z.lazy(() => NoteFragmentWhereInputSchema).optional(),
  none: z.lazy(() => NoteFragmentWhereInputSchema).optional()
}).strict();

export const PracticeFragmentListRelationFilterSchema: z.ZodType<Prisma.PracticeFragmentListRelationFilter> = z.object({
  every: z.lazy(() => PracticeFragmentWhereInputSchema).optional(),
  some: z.lazy(() => PracticeFragmentWhereInputSchema).optional(),
  none: z.lazy(() => PracticeFragmentWhereInputSchema).optional()
}).strict();

export const SceneFragmentListRelationFilterSchema: z.ZodType<Prisma.SceneFragmentListRelationFilter> = z.object({
  every: z.lazy(() => SceneFragmentWhereInputSchema).optional(),
  some: z.lazy(() => SceneFragmentWhereInputSchema).optional(),
  none: z.lazy(() => SceneFragmentWhereInputSchema).optional()
}).strict();

export const LevelResultFragmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteFragmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NoteFragmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PracticeFragmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PracticeFragmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneFragmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SceneFragmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FragmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.FragmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FragmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FragmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FragmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.FragmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.NoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  velocity: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  dur: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NoteAvgOrderByAggregateInput> = z.object({
  velocity: z.lazy(() => SortOrderSchema).optional(),
  dur: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  velocity: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  dur: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  velocity: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  dur: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteSumOrderByAggregateInputSchema: z.ZodType<Prisma.NoteSumOrderByAggregateInput> = z.object({
  velocity: z.lazy(() => SortOrderSchema).optional(),
  dur: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteRelationFilterSchema: z.ZodType<Prisma.NoteRelationFilter> = z.object({
  is: z.lazy(() => NoteWhereInputSchema).optional(),
  isNot: z.lazy(() => NoteWhereInputSchema).optional()
}).strict();

export const NoteFragmentNoteIdFragmentIdCompoundUniqueInputSchema: z.ZodType<Prisma.NoteFragmentNoteIdFragmentIdCompoundUniqueInput> = z.object({
  noteId: z.string(),
  fragmentId: z.string()
}).strict();

export const NoteFragmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.NoteFragmentCountOrderByAggregateInput> = z.object({
  noteId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteFragmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NoteFragmentMaxOrderByAggregateInput> = z.object({
  noteId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteFragmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.NoteFragmentMinOrderByAggregateInput> = z.object({
  noteId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultRelationFilterSchema: z.ZodType<Prisma.LevelResultRelationFilter> = z.object({
  is: z.lazy(() => LevelResultWhereInputSchema).optional(),
  isNot: z.lazy(() => LevelResultWhereInputSchema).optional()
}).strict();

export const LevelResultFragmentLevelResultIdFragmentIdCompoundUniqueInputSchema: z.ZodType<Prisma.LevelResultFragmentLevelResultIdFragmentIdCompoundUniqueInput> = z.object({
  levelResultId: z.string(),
  fragmentId: z.string()
}).strict();

export const LevelResultFragmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentCountOrderByAggregateInput> = z.object({
  levelResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultFragmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentMaxOrderByAggregateInput> = z.object({
  levelResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultFragmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentMinOrderByAggregateInput> = z.object({
  levelResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PracticeResultRelationFilterSchema: z.ZodType<Prisma.PracticeResultRelationFilter> = z.object({
  is: z.lazy(() => PracticeResultWhereInputSchema).optional(),
  isNot: z.lazy(() => PracticeResultWhereInputSchema).optional()
}).strict();

export const PracticeFragmentPracticeResultIdFragmentIdCompoundUniqueInputSchema: z.ZodType<Prisma.PracticeFragmentPracticeResultIdFragmentIdCompoundUniqueInput> = z.object({
  practiceResultId: z.string(),
  fragmentId: z.string()
}).strict();

export const PracticeFragmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.PracticeFragmentCountOrderByAggregateInput> = z.object({
  practiceResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PracticeFragmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PracticeFragmentMaxOrderByAggregateInput> = z.object({
  practiceResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PracticeFragmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.PracticeFragmentMinOrderByAggregateInput> = z.object({
  practiceResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneResultRelationFilterSchema: z.ZodType<Prisma.SceneResultRelationFilter> = z.object({
  is: z.lazy(() => SceneResultWhereInputSchema).optional(),
  isNot: z.lazy(() => SceneResultWhereInputSchema).optional()
}).strict();

export const SceneFragmentSceneResultIdFragmentIdCompoundUniqueInputSchema: z.ZodType<Prisma.SceneFragmentSceneResultIdFragmentIdCompoundUniqueInput> = z.object({
  sceneResultId: z.string(),
  fragmentId: z.string()
}).strict();

export const SceneFragmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.SceneFragmentCountOrderByAggregateInput> = z.object({
  sceneResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneFragmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SceneFragmentMaxOrderByAggregateInput> = z.object({
  sceneResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneFragmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.SceneFragmentMinOrderByAggregateInput> = z.object({
  sceneResultId: z.lazy(() => SortOrderSchema).optional(),
  fragmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PracticeResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.PracticeResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PracticeResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PracticeResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PracticeResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.PracticeResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.SceneResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  correct: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  levelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneResultAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SceneResultAvgOrderByAggregateInput> = z.object({
  transposed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SceneResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  correct: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  levelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.SceneResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  correct: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  levelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SceneResultSumOrderByAggregateInputSchema: z.ZodType<Prisma.SceneResultSumOrderByAggregateInput> = z.object({
  transposed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LevelResultCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultCreateWithoutUserInputSchema).array(),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PracticeResultCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutUserInputSchema),z.lazy(() => PracticeResultCreateWithoutUserInputSchema).array(),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => PracticeResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SceneResultCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SceneResultCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SceneResultCreateWithoutUserInputSchema),z.lazy(() => SceneResultCreateWithoutUserInputSchema).array(),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => SceneResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultCreateWithoutUserInputSchema).array(),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PracticeResultUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutUserInputSchema),z.lazy(() => PracticeResultCreateWithoutUserInputSchema).array(),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => PracticeResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SceneResultUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SceneResultUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SceneResultCreateWithoutUserInputSchema),z.lazy(() => SceneResultCreateWithoutUserInputSchema).array(),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => SceneResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LevelResultUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultCreateWithoutUserInputSchema).array(),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelResultUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LevelResultUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelResultUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LevelResultUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelResultUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LevelResultUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelResultScalarWhereInputSchema),z.lazy(() => LevelResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PracticeResultUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PracticeResultUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutUserInputSchema),z.lazy(() => PracticeResultCreateWithoutUserInputSchema).array(),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => PracticeResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PracticeResultUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PracticeResultUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PracticeResultUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PracticeResultUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PracticeResultUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PracticeResultUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PracticeResultScalarWhereInputSchema),z.lazy(() => PracticeResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SceneResultUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SceneResultUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SceneResultCreateWithoutUserInputSchema),z.lazy(() => SceneResultCreateWithoutUserInputSchema).array(),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => SceneResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SceneResultUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SceneResultUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SceneResultUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SceneResultUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SceneResultUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SceneResultUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SceneResultScalarWhereInputSchema),z.lazy(() => SceneResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultCreateWithoutUserInputSchema).array(),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelResultUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LevelResultUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelResultUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LevelResultUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelResultUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LevelResultUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelResultScalarWhereInputSchema),z.lazy(() => LevelResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PracticeResultUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PracticeResultUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutUserInputSchema),z.lazy(() => PracticeResultCreateWithoutUserInputSchema).array(),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => PracticeResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PracticeResultUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PracticeResultUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeResultWhereUniqueInputSchema),z.lazy(() => PracticeResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PracticeResultUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PracticeResultUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PracticeResultUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PracticeResultUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PracticeResultScalarWhereInputSchema),z.lazy(() => PracticeResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SceneResultUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SceneResultUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SceneResultCreateWithoutUserInputSchema),z.lazy(() => SceneResultCreateWithoutUserInputSchema).array(),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => SceneResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SceneResultUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SceneResultUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneResultWhereUniqueInputSchema),z.lazy(() => SceneResultWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SceneResultUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SceneResultUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SceneResultUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SceneResultUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SceneResultScalarWhereInputSchema),z.lazy(() => SceneResultScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelFragmentCreateNestedManyWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentCreateNestedManyWithoutLevelInput> = z.object({
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema).array(),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelFragmentCreateOrConnectWithoutLevelInputSchema),z.lazy(() => LevelFragmentCreateOrConnectWithoutLevelInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelFragmentUncheckedCreateNestedManyWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedCreateNestedManyWithoutLevelInput> = z.object({
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema).array(),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelFragmentCreateOrConnectWithoutLevelInputSchema),z.lazy(() => LevelFragmentCreateOrConnectWithoutLevelInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const LevelFragmentUpdateManyWithoutLevelNestedInputSchema: z.ZodType<Prisma.LevelFragmentUpdateManyWithoutLevelNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema).array(),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelFragmentCreateOrConnectWithoutLevelInputSchema),z.lazy(() => LevelFragmentCreateOrConnectWithoutLevelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelFragmentUpsertWithWhereUniqueWithoutLevelInputSchema),z.lazy(() => LevelFragmentUpsertWithWhereUniqueWithoutLevelInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelFragmentUpdateWithWhereUniqueWithoutLevelInputSchema),z.lazy(() => LevelFragmentUpdateWithWhereUniqueWithoutLevelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelFragmentUpdateManyWithWhereWithoutLevelInputSchema),z.lazy(() => LevelFragmentUpdateManyWithWhereWithoutLevelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelFragmentScalarWhereInputSchema),z.lazy(() => LevelFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelFragmentUncheckedUpdateManyWithoutLevelNestedInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedUpdateManyWithoutLevelNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema).array(),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelFragmentCreateOrConnectWithoutLevelInputSchema),z.lazy(() => LevelFragmentCreateOrConnectWithoutLevelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelFragmentUpsertWithWhereUniqueWithoutLevelInputSchema),z.lazy(() => LevelFragmentUpsertWithWhereUniqueWithoutLevelInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelFragmentUpdateWithWhereUniqueWithoutLevelInputSchema),z.lazy(() => LevelFragmentUpdateWithWhereUniqueWithoutLevelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelFragmentUpdateManyWithWhereWithoutLevelInputSchema),z.lazy(() => LevelFragmentUpdateManyWithWhereWithoutLevelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelFragmentScalarWhereInputSchema),z.lazy(() => LevelFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FragmentCreateNestedOneWithoutLevelsInputSchema: z.ZodType<Prisma.FragmentCreateNestedOneWithoutLevelsInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutLevelsInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional()
}).strict();

export const LevelCreateNestedOneWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelCreateNestedOneWithoutFragmentsInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => LevelWhereUniqueInputSchema).optional()
}).strict();

export const FragmentUpdateOneRequiredWithoutLevelsNestedInputSchema: z.ZodType<Prisma.FragmentUpdateOneRequiredWithoutLevelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutLevelsInputSchema).optional(),
  upsert: z.lazy(() => FragmentUpsertWithoutLevelsInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FragmentUpdateWithoutLevelsInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutLevelsInputSchema) ]).optional(),
}).strict();

export const LevelUpdateOneRequiredWithoutFragmentsNestedInputSchema: z.ZodType<Prisma.LevelUpdateOneRequiredWithoutFragmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema).optional(),
  upsert: z.lazy(() => LevelUpsertWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => LevelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutFragmentsInputSchema) ]).optional(),
}).strict();

export const LevelFragmentCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => LevelFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NoteFragmentCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => NoteFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PracticeFragmentCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SceneFragmentCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => SceneFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => LevelFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NoteFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => NoteFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PracticeFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SceneFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => SceneFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelFragmentUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.LevelFragmentUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => LevelFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelFragmentScalarWhereInputSchema),z.lazy(() => LevelFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelResultFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelResultFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelResultFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelResultFragmentScalarWhereInputSchema),z.lazy(() => LevelResultFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NoteFragmentUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.NoteFragmentUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => NoteFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NoteFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NoteFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NoteFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NoteFragmentScalarWhereInputSchema),z.lazy(() => NoteFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PracticeFragmentUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PracticeFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PracticeFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PracticeFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PracticeFragmentScalarWhereInputSchema),z.lazy(() => PracticeFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SceneFragmentUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.SceneFragmentUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => SceneFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SceneFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SceneFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SceneFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SceneFragmentScalarWhereInputSchema),z.lazy(() => SceneFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => LevelFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelFragmentWhereUniqueInputSchema),z.lazy(() => LevelFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelFragmentScalarWhereInputSchema),z.lazy(() => LevelFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelResultFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelResultFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelResultFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelResultFragmentScalarWhereInputSchema),z.lazy(() => LevelResultFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NoteFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => NoteFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NoteFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NoteFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NoteFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NoteFragmentScalarWhereInputSchema),z.lazy(() => NoteFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PracticeFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PracticeFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PracticeFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PracticeFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PracticeFragmentScalarWhereInputSchema),z.lazy(() => PracticeFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SceneFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema).array(),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneFragmentCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => SceneFragmentCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SceneFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SceneFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SceneFragmentUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SceneFragmentScalarWhereInputSchema),z.lazy(() => SceneFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NoteFragmentCreateNestedManyWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentCreateNestedManyWithoutNoteInput> = z.object({
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema).array(),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteFragmentCreateOrConnectWithoutNoteInputSchema),z.lazy(() => NoteFragmentCreateOrConnectWithoutNoteInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NoteFragmentUncheckedCreateNestedManyWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedCreateNestedManyWithoutNoteInput> = z.object({
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema).array(),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteFragmentCreateOrConnectWithoutNoteInputSchema),z.lazy(() => NoteFragmentCreateOrConnectWithoutNoteInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NoteFragmentUpdateManyWithoutNoteNestedInputSchema: z.ZodType<Prisma.NoteFragmentUpdateManyWithoutNoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema).array(),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteFragmentCreateOrConnectWithoutNoteInputSchema),z.lazy(() => NoteFragmentCreateOrConnectWithoutNoteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NoteFragmentUpsertWithWhereUniqueWithoutNoteInputSchema),z.lazy(() => NoteFragmentUpsertWithWhereUniqueWithoutNoteInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NoteFragmentUpdateWithWhereUniqueWithoutNoteInputSchema),z.lazy(() => NoteFragmentUpdateWithWhereUniqueWithoutNoteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NoteFragmentUpdateManyWithWhereWithoutNoteInputSchema),z.lazy(() => NoteFragmentUpdateManyWithWhereWithoutNoteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NoteFragmentScalarWhereInputSchema),z.lazy(() => NoteFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NoteFragmentUncheckedUpdateManyWithoutNoteNestedInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedUpdateManyWithoutNoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema).array(),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteFragmentCreateOrConnectWithoutNoteInputSchema),z.lazy(() => NoteFragmentCreateOrConnectWithoutNoteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NoteFragmentUpsertWithWhereUniqueWithoutNoteInputSchema),z.lazy(() => NoteFragmentUpsertWithWhereUniqueWithoutNoteInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteFragmentWhereUniqueInputSchema),z.lazy(() => NoteFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NoteFragmentUpdateWithWhereUniqueWithoutNoteInputSchema),z.lazy(() => NoteFragmentUpdateWithWhereUniqueWithoutNoteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NoteFragmentUpdateManyWithWhereWithoutNoteInputSchema),z.lazy(() => NoteFragmentUpdateManyWithWhereWithoutNoteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NoteFragmentScalarWhereInputSchema),z.lazy(() => NoteFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FragmentCreateNestedOneWithoutNotesInputSchema: z.ZodType<Prisma.FragmentCreateNestedOneWithoutNotesInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional()
}).strict();

export const NoteCreateNestedOneWithoutFragmentsInputSchema: z.ZodType<Prisma.NoteCreateNestedOneWithoutFragmentsInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentsInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NoteCreateOrConnectWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => NoteWhereUniqueInputSchema).optional()
}).strict();

export const FragmentUpdateOneRequiredWithoutNotesNestedInputSchema: z.ZodType<Prisma.FragmentUpdateOneRequiredWithoutNotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutNotesInputSchema).optional(),
  upsert: z.lazy(() => FragmentUpsertWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FragmentUpdateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutNotesInputSchema) ]).optional(),
}).strict();

export const NoteUpdateOneRequiredWithoutFragmentsNestedInputSchema: z.ZodType<Prisma.NoteUpdateOneRequiredWithoutFragmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentsInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NoteCreateOrConnectWithoutFragmentsInputSchema).optional(),
  upsert: z.lazy(() => NoteUpsertWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => NoteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NoteUpdateWithoutFragmentsInputSchema),z.lazy(() => NoteUncheckedUpdateWithoutFragmentsInputSchema) ]).optional(),
}).strict();

export const FragmentCreateNestedOneWithoutLevelResultsInputSchema: z.ZodType<Prisma.FragmentCreateNestedOneWithoutLevelResultsInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutLevelResultsInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional()
}).strict();

export const LevelResultCreateNestedOneWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelResultCreateNestedOneWithoutFragmentsInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutFragmentsInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelResultCreateOrConnectWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => LevelResultWhereUniqueInputSchema).optional()
}).strict();

export const FragmentUpdateOneRequiredWithoutLevelResultsNestedInputSchema: z.ZodType<Prisma.FragmentUpdateOneRequiredWithoutLevelResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutLevelResultsInputSchema).optional(),
  upsert: z.lazy(() => FragmentUpsertWithoutLevelResultsInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FragmentUpdateWithoutLevelResultsInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutLevelResultsInputSchema) ]).optional(),
}).strict();

export const LevelResultUpdateOneRequiredWithoutFragmentsNestedInputSchema: z.ZodType<Prisma.LevelResultUpdateOneRequiredWithoutFragmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutFragmentsInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelResultCreateOrConnectWithoutFragmentsInputSchema).optional(),
  upsert: z.lazy(() => LevelResultUpsertWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => LevelResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutFragmentsInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutFragmentsInputSchema) ]).optional(),
}).strict();

export const FragmentCreateNestedOneWithoutPracticeResultsInputSchema: z.ZodType<Prisma.FragmentCreateNestedOneWithoutPracticeResultsInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutPracticeResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutPracticeResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutPracticeResultsInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional()
}).strict();

export const PracticeResultCreateNestedOneWithoutFragmentsInputSchema: z.ZodType<Prisma.PracticeResultCreateNestedOneWithoutFragmentsInput> = z.object({
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutFragmentsInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PracticeResultCreateOrConnectWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => PracticeResultWhereUniqueInputSchema).optional()
}).strict();

export const FragmentUpdateOneRequiredWithoutPracticeResultsNestedInputSchema: z.ZodType<Prisma.FragmentUpdateOneRequiredWithoutPracticeResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutPracticeResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutPracticeResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutPracticeResultsInputSchema).optional(),
  upsert: z.lazy(() => FragmentUpsertWithoutPracticeResultsInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FragmentUpdateWithoutPracticeResultsInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutPracticeResultsInputSchema) ]).optional(),
}).strict();

export const PracticeResultUpdateOneRequiredWithoutFragmentsNestedInputSchema: z.ZodType<Prisma.PracticeResultUpdateOneRequiredWithoutFragmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutFragmentsInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PracticeResultCreateOrConnectWithoutFragmentsInputSchema).optional(),
  upsert: z.lazy(() => PracticeResultUpsertWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => PracticeResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PracticeResultUpdateWithoutFragmentsInputSchema),z.lazy(() => PracticeResultUncheckedUpdateWithoutFragmentsInputSchema) ]).optional(),
}).strict();

export const FragmentCreateNestedOneWithoutSceneResultsInputSchema: z.ZodType<Prisma.FragmentCreateNestedOneWithoutSceneResultsInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutSceneResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutSceneResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutSceneResultsInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional()
}).strict();

export const SceneResultCreateNestedOneWithoutFragmentsInputSchema: z.ZodType<Prisma.SceneResultCreateNestedOneWithoutFragmentsInput> = z.object({
  create: z.union([ z.lazy(() => SceneResultCreateWithoutFragmentsInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SceneResultCreateOrConnectWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => SceneResultWhereUniqueInputSchema).optional()
}).strict();

export const FragmentUpdateOneRequiredWithoutSceneResultsNestedInputSchema: z.ZodType<Prisma.FragmentUpdateOneRequiredWithoutSceneResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutSceneResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutSceneResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutSceneResultsInputSchema).optional(),
  upsert: z.lazy(() => FragmentUpsertWithoutSceneResultsInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FragmentUpdateWithoutSceneResultsInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutSceneResultsInputSchema) ]).optional(),
}).strict();

export const SceneResultUpdateOneRequiredWithoutFragmentsNestedInputSchema: z.ZodType<Prisma.SceneResultUpdateOneRequiredWithoutFragmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SceneResultCreateWithoutFragmentsInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutFragmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SceneResultCreateOrConnectWithoutFragmentsInputSchema).optional(),
  upsert: z.lazy(() => SceneResultUpsertWithoutFragmentsInputSchema).optional(),
  connect: z.lazy(() => SceneResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SceneResultUpdateWithoutFragmentsInputSchema),z.lazy(() => SceneResultUncheckedUpdateWithoutFragmentsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLevelResultsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLevelResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLevelResultsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const LevelResultFragmentCreateNestedManyWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentCreateNestedManyWithoutLevelResultInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentUncheckedCreateNestedManyWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedCreateNestedManyWithoutLevelResultInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutLevelResultsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLevelResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLevelResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLevelResultsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLevelResultsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLevelResultsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentUpdateManyWithoutLevelResultNestedInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateManyWithoutLevelResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelResultFragmentUpsertWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUpsertWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelResultFragmentUpdateWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUpdateWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelResultFragmentUpdateManyWithWhereWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUpdateManyWithWhereWithoutLevelResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelResultFragmentScalarWhereInputSchema),z.lazy(() => LevelResultFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentUncheckedUpdateManyWithoutLevelResultNestedInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedUpdateManyWithoutLevelResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelResultFragmentUpsertWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUpsertWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelResultFragmentUpdateWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUpdateWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelResultFragmentUpdateManyWithWhereWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUpdateManyWithWhereWithoutLevelResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelResultFragmentScalarWhereInputSchema),z.lazy(() => LevelResultFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PracticeFragmentCreateNestedManyWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentCreateNestedManyWithoutPracticeResultInput> = z.object({
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema).array(),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPracticeResultsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPracticeResultsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPracticeResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPracticeResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPracticeResultsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PracticeFragmentUncheckedCreateNestedManyWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedCreateNestedManyWithoutPracticeResultInput> = z.object({
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema).array(),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PracticeFragmentUpdateManyWithoutPracticeResultNestedInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateManyWithoutPracticeResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema).array(),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PracticeFragmentUpsertWithWhereUniqueWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUpsertWithWhereUniqueWithoutPracticeResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PracticeFragmentUpdateWithWhereUniqueWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUpdateWithWhereUniqueWithoutPracticeResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PracticeFragmentUpdateManyWithWhereWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUpdateManyWithWhereWithoutPracticeResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PracticeFragmentScalarWhereInputSchema),z.lazy(() => PracticeFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPracticeResultsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPracticeResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPracticeResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPracticeResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPracticeResultsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPracticeResultsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutPracticeResultsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPracticeResultsInputSchema) ]).optional(),
}).strict();

export const PracticeFragmentUncheckedUpdateManyWithoutPracticeResultNestedInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedUpdateManyWithoutPracticeResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema).array(),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PracticeFragmentUpsertWithWhereUniqueWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUpsertWithWhereUniqueWithoutPracticeResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PracticeFragmentWhereUniqueInputSchema),z.lazy(() => PracticeFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PracticeFragmentUpdateWithWhereUniqueWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUpdateWithWhereUniqueWithoutPracticeResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PracticeFragmentUpdateManyWithWhereWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUpdateManyWithWhereWithoutPracticeResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PracticeFragmentScalarWhereInputSchema),z.lazy(() => PracticeFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SceneFragmentCreateNestedManyWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentCreateNestedManyWithoutSceneResultInput> = z.object({
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema).array(),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneFragmentCreateOrConnectWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentCreateOrConnectWithoutSceneResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSceneResultsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSceneResultsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSceneResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSceneResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSceneResultsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SceneFragmentUncheckedCreateNestedManyWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedCreateNestedManyWithoutSceneResultInput> = z.object({
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema).array(),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneFragmentCreateOrConnectWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentCreateOrConnectWithoutSceneResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SceneFragmentUpdateManyWithoutSceneResultNestedInputSchema: z.ZodType<Prisma.SceneFragmentUpdateManyWithoutSceneResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema).array(),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneFragmentCreateOrConnectWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentCreateOrConnectWithoutSceneResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SceneFragmentUpsertWithWhereUniqueWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUpsertWithWhereUniqueWithoutSceneResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SceneFragmentUpdateWithWhereUniqueWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUpdateWithWhereUniqueWithoutSceneResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SceneFragmentUpdateManyWithWhereWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUpdateManyWithWhereWithoutSceneResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SceneFragmentScalarWhereInputSchema),z.lazy(() => SceneFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSceneResultsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSceneResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSceneResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSceneResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSceneResultsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSceneResultsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSceneResultsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSceneResultsInputSchema) ]).optional(),
}).strict();

export const SceneFragmentUncheckedUpdateManyWithoutSceneResultNestedInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedUpdateManyWithoutSceneResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema).array(),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SceneFragmentCreateOrConnectWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentCreateOrConnectWithoutSceneResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SceneFragmentUpsertWithWhereUniqueWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUpsertWithWhereUniqueWithoutSceneResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SceneFragmentWhereUniqueInputSchema),z.lazy(() => SceneFragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SceneFragmentUpdateWithWhereUniqueWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUpdateWithWhereUniqueWithoutSceneResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SceneFragmentUpdateManyWithWhereWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUpdateManyWithWhereWithoutSceneResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SceneFragmentScalarWhereInputSchema),z.lazy(() => SceneFragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LevelResultCreateWithoutUserInputSchema: z.ZodType<Prisma.LevelResultCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  fragments: z.lazy(() => LevelResultFragmentCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  fragments: z.lazy(() => LevelResultFragmentUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LevelResultCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LevelResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PracticeResultCreateWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  fragments: z.lazy(() => PracticeFragmentCreateNestedManyWithoutPracticeResultInputSchema).optional()
}).strict();

export const PracticeResultUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  fragments: z.lazy(() => PracticeFragmentUncheckedCreateNestedManyWithoutPracticeResultInputSchema).optional()
}).strict();

export const PracticeResultCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PracticeResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutUserInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SceneResultCreateWithoutUserInputSchema: z.ZodType<Prisma.SceneResultCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  correct: z.boolean(),
  transposed: z.number(),
  levelId: z.string(),
  fragments: z.lazy(() => SceneFragmentCreateNestedManyWithoutSceneResultInputSchema).optional()
}).strict();

export const SceneResultUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SceneResultUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  correct: z.boolean(),
  transposed: z.number(),
  levelId: z.string(),
  fragments: z.lazy(() => SceneFragmentUncheckedCreateNestedManyWithoutSceneResultInputSchema).optional()
}).strict();

export const SceneResultCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SceneResultCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SceneResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SceneResultCreateWithoutUserInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const LevelResultUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LevelResultWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LevelResultUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LevelResultWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelResultUpdateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LevelResultUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LevelResultScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelResultUpdateManyMutationInputSchema),z.lazy(() => LevelResultUncheckedUpdateManyWithoutLevelResultsInputSchema) ]),
}).strict();

export const LevelResultScalarWhereInputSchema: z.ZodType<Prisma.LevelResultScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultScalarWhereInputSchema),z.lazy(() => LevelResultScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultScalarWhereInputSchema),z.lazy(() => LevelResultScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PracticeResultUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PracticeResultWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PracticeResultUpdateWithoutUserInputSchema),z.lazy(() => PracticeResultUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutUserInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PracticeResultUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PracticeResultWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PracticeResultUpdateWithoutUserInputSchema),z.lazy(() => PracticeResultUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PracticeResultUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PracticeResultScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PracticeResultUpdateManyMutationInputSchema),z.lazy(() => PracticeResultUncheckedUpdateManyWithoutPracticeResultsInputSchema) ]),
}).strict();

export const PracticeResultScalarWhereInputSchema: z.ZodType<Prisma.PracticeResultScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PracticeResultScalarWhereInputSchema),z.lazy(() => PracticeResultScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PracticeResultScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PracticeResultScalarWhereInputSchema),z.lazy(() => PracticeResultScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SceneResultUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SceneResultUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SceneResultWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SceneResultUpdateWithoutUserInputSchema),z.lazy(() => SceneResultUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SceneResultCreateWithoutUserInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SceneResultUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SceneResultUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SceneResultWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SceneResultUpdateWithoutUserInputSchema),z.lazy(() => SceneResultUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SceneResultUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SceneResultUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SceneResultScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SceneResultUpdateManyMutationInputSchema),z.lazy(() => SceneResultUncheckedUpdateManyWithoutSceneResultsInputSchema) ]),
}).strict();

export const SceneResultScalarWhereInputSchema: z.ZodType<Prisma.SceneResultScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SceneResultScalarWhereInputSchema),z.lazy(() => SceneResultScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SceneResultScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SceneResultScalarWhereInputSchema),z.lazy(() => SceneResultScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  correct: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transposed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  levelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LevelFragmentCreateWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentCreateWithoutLevelInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutLevelsInputSchema)
}).strict();

export const LevelFragmentUncheckedCreateWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedCreateWithoutLevelInput> = z.object({
  fragmentId: z.string()
}).strict();

export const LevelFragmentCreateOrConnectWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentCreateOrConnectWithoutLevelInput> = z.object({
  where: z.lazy(() => LevelFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema) ]),
}).strict();

export const LevelFragmentUpsertWithWhereUniqueWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentUpsertWithWhereUniqueWithoutLevelInput> = z.object({
  where: z.lazy(() => LevelFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelFragmentUpdateWithoutLevelInputSchema),z.lazy(() => LevelFragmentUncheckedUpdateWithoutLevelInputSchema) ]),
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutLevelInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutLevelInputSchema) ]),
}).strict();

export const LevelFragmentUpdateWithWhereUniqueWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentUpdateWithWhereUniqueWithoutLevelInput> = z.object({
  where: z.lazy(() => LevelFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelFragmentUpdateWithoutLevelInputSchema),z.lazy(() => LevelFragmentUncheckedUpdateWithoutLevelInputSchema) ]),
}).strict();

export const LevelFragmentUpdateManyWithWhereWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentUpdateManyWithWhereWithoutLevelInput> = z.object({
  where: z.lazy(() => LevelFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelFragmentUpdateManyMutationInputSchema),z.lazy(() => LevelFragmentUncheckedUpdateManyWithoutFragmentsInputSchema) ]),
}).strict();

export const LevelFragmentScalarWhereInputSchema: z.ZodType<Prisma.LevelFragmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelFragmentScalarWhereInputSchema),z.lazy(() => LevelFragmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelFragmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelFragmentScalarWhereInputSchema),z.lazy(() => LevelFragmentScalarWhereInputSchema).array() ]).optional(),
  levelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FragmentCreateWithoutLevelsInputSchema: z.ZodType<Prisma.FragmentCreateWithoutLevelsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levelResults: z.lazy(() => LevelResultFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateWithoutLevelsInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateWithoutLevelsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentCreateOrConnectWithoutLevelsInputSchema: z.ZodType<Prisma.FragmentCreateOrConnectWithoutLevelsInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelsInputSchema) ]),
}).strict();

export const LevelCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  enablePractice: z.boolean(),
  bpm: z.number(),
  description: z.string(),
  fragmentVisibleCount: z.number(),
  duration: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number()
}).strict();

export const LevelUncheckedCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUncheckedCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  enablePractice: z.boolean(),
  bpm: z.number(),
  description: z.string(),
  fragmentVisibleCount: z.number(),
  duration: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number()
}).strict();

export const LevelCreateOrConnectWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelCreateOrConnectWithoutFragmentsInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const FragmentUpsertWithoutLevelsInputSchema: z.ZodType<Prisma.FragmentUpsertWithoutLevelsInput> = z.object({
  update: z.union([ z.lazy(() => FragmentUpdateWithoutLevelsInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutLevelsInputSchema) ]),
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelsInputSchema) ]),
}).strict();

export const FragmentUpdateWithoutLevelsInputSchema: z.ZodType<Prisma.FragmentUpdateWithoutLevelsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateWithoutLevelsInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateWithoutLevelsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const LevelUpsertWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUpsertWithoutFragmentsInput> = z.object({
  update: z.union([ z.lazy(() => LevelUpdateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutFragmentsInputSchema) ]),
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const LevelUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enablePractice: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bpm: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentVisibleCount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelUncheckedUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enablePractice: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bpm: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragmentVisibleCount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelFragmentCreateWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentCreateWithoutFragmentInput> = z.object({
  level: z.lazy(() => LevelCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const LevelFragmentUncheckedCreateWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedCreateWithoutFragmentInput> = z.object({
  levelId: z.string()
}).strict();

export const LevelFragmentCreateOrConnectWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentCreateOrConnectWithoutFragmentInput> = z.object({
  where: z.lazy(() => LevelFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const LevelResultFragmentCreateWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentCreateWithoutFragmentInput> = z.object({
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedCreateWithoutFragmentInput> = z.object({
  levelResultId: z.string()
}).strict();

export const LevelResultFragmentCreateOrConnectWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentCreateOrConnectWithoutFragmentInput> = z.object({
  where: z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const NoteFragmentCreateWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentCreateWithoutFragmentInput> = z.object({
  note: z.lazy(() => NoteCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const NoteFragmentUncheckedCreateWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedCreateWithoutFragmentInput> = z.object({
  noteId: z.string()
}).strict();

export const NoteFragmentCreateOrConnectWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentCreateOrConnectWithoutFragmentInput> = z.object({
  where: z.lazy(() => NoteFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const PracticeFragmentCreateWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentCreateWithoutFragmentInput> = z.object({
  practiceResult: z.lazy(() => PracticeResultCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const PracticeFragmentUncheckedCreateWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedCreateWithoutFragmentInput> = z.object({
  practiceResultId: z.string()
}).strict();

export const PracticeFragmentCreateOrConnectWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentCreateOrConnectWithoutFragmentInput> = z.object({
  where: z.lazy(() => PracticeFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const SceneFragmentCreateWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentCreateWithoutFragmentInput> = z.object({
  sceneResult: z.lazy(() => SceneResultCreateNestedOneWithoutFragmentsInputSchema)
}).strict();

export const SceneFragmentUncheckedCreateWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedCreateWithoutFragmentInput> = z.object({
  sceneResultId: z.string()
}).strict();

export const SceneFragmentCreateOrConnectWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentCreateOrConnectWithoutFragmentInput> = z.object({
  where: z.lazy(() => SceneFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const LevelFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentUpsertWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => LevelFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
  create: z.union([ z.lazy(() => LevelFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const LevelFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentUpdateWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => LevelFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => LevelFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
}).strict();

export const LevelFragmentUpdateManyWithWhereWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentUpdateManyWithWhereWithoutFragmentInput> = z.object({
  where: z.lazy(() => LevelFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelFragmentUpdateManyMutationInputSchema),z.lazy(() => LevelFragmentUncheckedUpdateManyWithoutLevelsInputSchema) ]),
}).strict();

export const LevelResultFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentUpsertWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelResultFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const LevelResultFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelResultFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => LevelResultFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
}).strict();

export const LevelResultFragmentUpdateManyWithWhereWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateManyWithWhereWithoutFragmentInput> = z.object({
  where: z.lazy(() => LevelResultFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelResultFragmentUpdateManyMutationInputSchema),z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutLevelResultsInputSchema) ]),
}).strict();

export const LevelResultFragmentScalarWhereInputSchema: z.ZodType<Prisma.LevelResultFragmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultFragmentScalarWhereInputSchema),z.lazy(() => LevelResultFragmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultFragmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultFragmentScalarWhereInputSchema),z.lazy(() => LevelResultFragmentScalarWhereInputSchema).array() ]).optional(),
  levelResultId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const NoteFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentUpsertWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => NoteFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NoteFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const NoteFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentUpdateWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => NoteFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NoteFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => NoteFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
}).strict();

export const NoteFragmentUpdateManyWithWhereWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentUpdateManyWithWhereWithoutFragmentInput> = z.object({
  where: z.lazy(() => NoteFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NoteFragmentUpdateManyMutationInputSchema),z.lazy(() => NoteFragmentUncheckedUpdateManyWithoutNotesInputSchema) ]),
}).strict();

export const NoteFragmentScalarWhereInputSchema: z.ZodType<Prisma.NoteFragmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteFragmentScalarWhereInputSchema),z.lazy(() => NoteFragmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteFragmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteFragmentScalarWhereInputSchema),z.lazy(() => NoteFragmentScalarWhereInputSchema).array() ]).optional(),
  noteId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PracticeFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentUpsertWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => PracticeFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PracticeFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const PracticeFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => PracticeFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PracticeFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => PracticeFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
}).strict();

export const PracticeFragmentUpdateManyWithWhereWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateManyWithWhereWithoutFragmentInput> = z.object({
  where: z.lazy(() => PracticeFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PracticeFragmentUpdateManyMutationInputSchema),z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutPracticeResultsInputSchema) ]),
}).strict();

export const PracticeFragmentScalarWhereInputSchema: z.ZodType<Prisma.PracticeFragmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PracticeFragmentScalarWhereInputSchema),z.lazy(() => PracticeFragmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PracticeFragmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PracticeFragmentScalarWhereInputSchema),z.lazy(() => PracticeFragmentScalarWhereInputSchema).array() ]).optional(),
  practiceResultId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SceneFragmentUpsertWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentUpsertWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => SceneFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SceneFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const SceneFragmentUpdateWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentUpdateWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => SceneFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SceneFragmentUpdateWithoutFragmentInputSchema),z.lazy(() => SceneFragmentUncheckedUpdateWithoutFragmentInputSchema) ]),
}).strict();

export const SceneFragmentUpdateManyWithWhereWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentUpdateManyWithWhereWithoutFragmentInput> = z.object({
  where: z.lazy(() => SceneFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SceneFragmentUpdateManyMutationInputSchema),z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutSceneResultsInputSchema) ]),
}).strict();

export const SceneFragmentScalarWhereInputSchema: z.ZodType<Prisma.SceneFragmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SceneFragmentScalarWhereInputSchema),z.lazy(() => SceneFragmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SceneFragmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SceneFragmentScalarWhereInputSchema),z.lazy(() => SceneFragmentScalarWhereInputSchema).array() ]).optional(),
  sceneResultId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fragmentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const NoteFragmentCreateWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentCreateWithoutNoteInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutNotesInputSchema)
}).strict();

export const NoteFragmentUncheckedCreateWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedCreateWithoutNoteInput> = z.object({
  fragmentId: z.string()
}).strict();

export const NoteFragmentCreateOrConnectWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentCreateOrConnectWithoutNoteInput> = z.object({
  where: z.lazy(() => NoteFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema) ]),
}).strict();

export const NoteFragmentUpsertWithWhereUniqueWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentUpsertWithWhereUniqueWithoutNoteInput> = z.object({
  where: z.lazy(() => NoteFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NoteFragmentUpdateWithoutNoteInputSchema),z.lazy(() => NoteFragmentUncheckedUpdateWithoutNoteInputSchema) ]),
  create: z.union([ z.lazy(() => NoteFragmentCreateWithoutNoteInputSchema),z.lazy(() => NoteFragmentUncheckedCreateWithoutNoteInputSchema) ]),
}).strict();

export const NoteFragmentUpdateWithWhereUniqueWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentUpdateWithWhereUniqueWithoutNoteInput> = z.object({
  where: z.lazy(() => NoteFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NoteFragmentUpdateWithoutNoteInputSchema),z.lazy(() => NoteFragmentUncheckedUpdateWithoutNoteInputSchema) ]),
}).strict();

export const NoteFragmentUpdateManyWithWhereWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentUpdateManyWithWhereWithoutNoteInput> = z.object({
  where: z.lazy(() => NoteFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NoteFragmentUpdateManyMutationInputSchema),z.lazy(() => NoteFragmentUncheckedUpdateManyWithoutFragmentsInputSchema) ]),
}).strict();

export const FragmentCreateWithoutNotesInputSchema: z.ZodType<Prisma.FragmentCreateWithoutNotesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateWithoutNotesInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateWithoutNotesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentCreateOrConnectWithoutNotesInputSchema: z.ZodType<Prisma.FragmentCreateOrConnectWithoutNotesInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FragmentCreateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutNotesInputSchema) ]),
}).strict();

export const NoteCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.NoteCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  note: z.string(),
  velocity: z.number(),
  time: z.string(),
  dur: z.number()
}).strict();

export const NoteUncheckedCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.NoteUncheckedCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  note: z.string(),
  velocity: z.number(),
  time: z.string(),
  dur: z.number()
}).strict();

export const NoteCreateOrConnectWithoutFragmentsInputSchema: z.ZodType<Prisma.NoteCreateOrConnectWithoutFragmentsInput> = z.object({
  where: z.lazy(() => NoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentsInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const FragmentUpsertWithoutNotesInputSchema: z.ZodType<Prisma.FragmentUpsertWithoutNotesInput> = z.object({
  update: z.union([ z.lazy(() => FragmentUpdateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutNotesInputSchema) ]),
  create: z.union([ z.lazy(() => FragmentCreateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutNotesInputSchema) ]),
}).strict();

export const FragmentUpdateWithoutNotesInputSchema: z.ZodType<Prisma.FragmentUpdateWithoutNotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateWithoutNotesInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateWithoutNotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const NoteUpsertWithoutFragmentsInputSchema: z.ZodType<Prisma.NoteUpsertWithoutFragmentsInput> = z.object({
  update: z.union([ z.lazy(() => NoteUpdateWithoutFragmentsInputSchema),z.lazy(() => NoteUncheckedUpdateWithoutFragmentsInputSchema) ]),
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentsInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const NoteUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.NoteUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  velocity: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dur: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  velocity: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dur: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FragmentCreateWithoutLevelResultsInputSchema: z.ZodType<Prisma.FragmentCreateWithoutLevelResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateWithoutLevelResultsInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateWithoutLevelResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentCreateOrConnectWithoutLevelResultsInputSchema: z.ZodType<Prisma.FragmentCreateOrConnectWithoutLevelResultsInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelResultsInputSchema) ]),
}).strict();

export const LevelResultCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelResultCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutLevelResultsInputSchema)
}).strict();

export const LevelResultUncheckedCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  date: z.coerce.date()
}).strict();

export const LevelResultCreateOrConnectWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelResultCreateOrConnectWithoutFragmentsInput> = z.object({
  where: z.lazy(() => LevelResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutFragmentsInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const FragmentUpsertWithoutLevelResultsInputSchema: z.ZodType<Prisma.FragmentUpsertWithoutLevelResultsInput> = z.object({
  update: z.union([ z.lazy(() => FragmentUpdateWithoutLevelResultsInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutLevelResultsInputSchema) ]),
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelResultsInputSchema) ]),
}).strict();

export const FragmentUpdateWithoutLevelResultsInputSchema: z.ZodType<Prisma.FragmentUpdateWithoutLevelResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateWithoutLevelResultsInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateWithoutLevelResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const LevelResultUpsertWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelResultUpsertWithoutFragmentsInput> = z.object({
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutFragmentsInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutFragmentsInputSchema) ]),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutFragmentsInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const LevelResultUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelResultUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLevelResultsNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FragmentCreateWithoutPracticeResultsInputSchema: z.ZodType<Prisma.FragmentCreateWithoutPracticeResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateWithoutPracticeResultsInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateWithoutPracticeResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentCreateOrConnectWithoutPracticeResultsInputSchema: z.ZodType<Prisma.FragmentCreateOrConnectWithoutPracticeResultsInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FragmentCreateWithoutPracticeResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutPracticeResultsInputSchema) ]),
}).strict();

export const PracticeResultCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.PracticeResultCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutPracticeResultsInputSchema)
}).strict();

export const PracticeResultUncheckedCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.PracticeResultUncheckedCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  date: z.coerce.date()
}).strict();

export const PracticeResultCreateOrConnectWithoutFragmentsInputSchema: z.ZodType<Prisma.PracticeResultCreateOrConnectWithoutFragmentsInput> = z.object({
  where: z.lazy(() => PracticeResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutFragmentsInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const FragmentUpsertWithoutPracticeResultsInputSchema: z.ZodType<Prisma.FragmentUpsertWithoutPracticeResultsInput> = z.object({
  update: z.union([ z.lazy(() => FragmentUpdateWithoutPracticeResultsInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutPracticeResultsInputSchema) ]),
  create: z.union([ z.lazy(() => FragmentCreateWithoutPracticeResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutPracticeResultsInputSchema) ]),
}).strict();

export const FragmentUpdateWithoutPracticeResultsInputSchema: z.ZodType<Prisma.FragmentUpdateWithoutPracticeResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateWithoutPracticeResultsInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateWithoutPracticeResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const PracticeResultUpsertWithoutFragmentsInputSchema: z.ZodType<Prisma.PracticeResultUpsertWithoutFragmentsInput> = z.object({
  update: z.union([ z.lazy(() => PracticeResultUpdateWithoutFragmentsInputSchema),z.lazy(() => PracticeResultUncheckedUpdateWithoutFragmentsInputSchema) ]),
  create: z.union([ z.lazy(() => PracticeResultCreateWithoutFragmentsInputSchema),z.lazy(() => PracticeResultUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const PracticeResultUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.PracticeResultUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPracticeResultsNestedInputSchema).optional()
}).strict();

export const PracticeResultUncheckedUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.PracticeResultUncheckedUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FragmentCreateWithoutSceneResultsInputSchema: z.ZodType<Prisma.FragmentCreateWithoutSceneResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateWithoutSceneResultsInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateWithoutSceneResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  levels: z.lazy(() => LevelFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentCreateOrConnectWithoutSceneResultsInputSchema: z.ZodType<Prisma.FragmentCreateOrConnectWithoutSceneResultsInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FragmentCreateWithoutSceneResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutSceneResultsInputSchema) ]),
}).strict();

export const SceneResultCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.SceneResultCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  correct: z.boolean(),
  transposed: z.number(),
  levelId: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutSceneResultsInputSchema)
}).strict();

export const SceneResultUncheckedCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.SceneResultUncheckedCreateWithoutFragmentsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  correct: z.boolean(),
  transposed: z.number(),
  levelId: z.string()
}).strict();

export const SceneResultCreateOrConnectWithoutFragmentsInputSchema: z.ZodType<Prisma.SceneResultCreateOrConnectWithoutFragmentsInput> = z.object({
  where: z.lazy(() => SceneResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SceneResultCreateWithoutFragmentsInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const FragmentUpsertWithoutSceneResultsInputSchema: z.ZodType<Prisma.FragmentUpsertWithoutSceneResultsInput> = z.object({
  update: z.union([ z.lazy(() => FragmentUpdateWithoutSceneResultsInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutSceneResultsInputSchema) ]),
  create: z.union([ z.lazy(() => FragmentCreateWithoutSceneResultsInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutSceneResultsInputSchema) ]),
}).strict();

export const FragmentUpdateWithoutSceneResultsInputSchema: z.ZodType<Prisma.FragmentUpdateWithoutSceneResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateWithoutSceneResultsInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateWithoutSceneResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  notes: z.lazy(() => NoteFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const SceneResultUpsertWithoutFragmentsInputSchema: z.ZodType<Prisma.SceneResultUpsertWithoutFragmentsInput> = z.object({
  update: z.union([ z.lazy(() => SceneResultUpdateWithoutFragmentsInputSchema),z.lazy(() => SceneResultUncheckedUpdateWithoutFragmentsInputSchema) ]),
  create: z.union([ z.lazy(() => SceneResultCreateWithoutFragmentsInputSchema),z.lazy(() => SceneResultUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const SceneResultUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.SceneResultUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSceneResultsNestedInputSchema).optional()
}).strict();

export const SceneResultUncheckedUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.SceneResultUncheckedUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserCreateWithoutLevelResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLevelResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLevelResultsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLevelResultsInputSchema) ]),
}).strict();

export const LevelResultFragmentCreateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentCreateWithoutLevelResultInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutLevelResultsInputSchema)
}).strict();

export const LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedCreateWithoutLevelResultInput> = z.object({
  fragmentId: z.string()
}).strict();

export const LevelResultFragmentCreateOrConnectWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentCreateOrConnectWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema) ]),
}).strict();

export const UserUpsertWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserUpsertWithoutLevelResultsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLevelResultsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLevelResultsInputSchema) ]),
}).strict();

export const UserUpdateWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserUpdateWithoutLevelResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLevelResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const LevelResultFragmentUpsertWithWhereUniqueWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentUpsertWithWhereUniqueWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelResultFragmentUpdateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUncheckedUpdateWithoutLevelResultInputSchema) ]),
  create: z.union([ z.lazy(() => LevelResultFragmentCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUncheckedCreateWithoutLevelResultInputSchema) ]),
}).strict();

export const LevelResultFragmentUpdateWithWhereUniqueWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateWithWhereUniqueWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelResultFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelResultFragmentUpdateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentUncheckedUpdateWithoutLevelResultInputSchema) ]),
}).strict();

export const LevelResultFragmentUpdateManyWithWhereWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateManyWithWhereWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelResultFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelResultFragmentUpdateManyMutationInputSchema),z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutFragmentsInputSchema) ]),
}).strict();

export const PracticeFragmentCreateWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentCreateWithoutPracticeResultInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutPracticeResultsInputSchema)
}).strict();

export const PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedCreateWithoutPracticeResultInput> = z.object({
  fragmentId: z.string()
}).strict();

export const PracticeFragmentCreateOrConnectWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentCreateOrConnectWithoutPracticeResultInput> = z.object({
  where: z.lazy(() => PracticeFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema) ]),
}).strict();

export const UserCreateWithoutPracticeResultsInputSchema: z.ZodType<Prisma.UserCreateWithoutPracticeResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPracticeResultsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPracticeResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPracticeResultsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPracticeResultsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPracticeResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPracticeResultsInputSchema) ]),
}).strict();

export const PracticeFragmentUpsertWithWhereUniqueWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentUpsertWithWhereUniqueWithoutPracticeResultInput> = z.object({
  where: z.lazy(() => PracticeFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PracticeFragmentUpdateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUncheckedUpdateWithoutPracticeResultInputSchema) ]),
  create: z.union([ z.lazy(() => PracticeFragmentCreateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUncheckedCreateWithoutPracticeResultInputSchema) ]),
}).strict();

export const PracticeFragmentUpdateWithWhereUniqueWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateWithWhereUniqueWithoutPracticeResultInput> = z.object({
  where: z.lazy(() => PracticeFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PracticeFragmentUpdateWithoutPracticeResultInputSchema),z.lazy(() => PracticeFragmentUncheckedUpdateWithoutPracticeResultInputSchema) ]),
}).strict();

export const PracticeFragmentUpdateManyWithWhereWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateManyWithWhereWithoutPracticeResultInput> = z.object({
  where: z.lazy(() => PracticeFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PracticeFragmentUpdateManyMutationInputSchema),z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutFragmentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutPracticeResultsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPracticeResultsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPracticeResultsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPracticeResultsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPracticeResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPracticeResultsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPracticeResultsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPracticeResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPracticeResultsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPracticeResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sceneResults: z.lazy(() => SceneResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SceneFragmentCreateWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentCreateWithoutSceneResultInput> = z.object({
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutSceneResultsInputSchema)
}).strict();

export const SceneFragmentUncheckedCreateWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedCreateWithoutSceneResultInput> = z.object({
  fragmentId: z.string()
}).strict();

export const SceneFragmentCreateOrConnectWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentCreateOrConnectWithoutSceneResultInput> = z.object({
  where: z.lazy(() => SceneFragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema) ]),
}).strict();

export const UserCreateWithoutSceneResultsInputSchema: z.ZodType<Prisma.UserCreateWithoutSceneResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSceneResultsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSceneResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSceneResultsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSceneResultsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSceneResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSceneResultsInputSchema) ]),
}).strict();

export const SceneFragmentUpsertWithWhereUniqueWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentUpsertWithWhereUniqueWithoutSceneResultInput> = z.object({
  where: z.lazy(() => SceneFragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SceneFragmentUpdateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUncheckedUpdateWithoutSceneResultInputSchema) ]),
  create: z.union([ z.lazy(() => SceneFragmentCreateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUncheckedCreateWithoutSceneResultInputSchema) ]),
}).strict();

export const SceneFragmentUpdateWithWhereUniqueWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentUpdateWithWhereUniqueWithoutSceneResultInput> = z.object({
  where: z.lazy(() => SceneFragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SceneFragmentUpdateWithoutSceneResultInputSchema),z.lazy(() => SceneFragmentUncheckedUpdateWithoutSceneResultInputSchema) ]),
}).strict();

export const SceneFragmentUpdateManyWithWhereWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentUpdateManyWithWhereWithoutSceneResultInput> = z.object({
  where: z.lazy(() => SceneFragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SceneFragmentUpdateManyMutationInputSchema),z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutFragmentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSceneResultsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSceneResultsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSceneResultsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSceneResultsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSceneResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSceneResultsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSceneResultsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSceneResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSceneResultsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSceneResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  practiceResults: z.lazy(() => PracticeResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LevelResultUpdateWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => LevelResultFragmentUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => LevelResultFragmentUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateManyWithoutLevelResultsInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateManyWithoutLevelResultsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeResultUpdateWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => PracticeFragmentUpdateManyWithoutPracticeResultNestedInputSchema).optional()
}).strict();

export const PracticeResultUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PracticeResultUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => PracticeFragmentUncheckedUpdateManyWithoutPracticeResultNestedInputSchema).optional()
}).strict();

export const PracticeResultUncheckedUpdateManyWithoutPracticeResultsInputSchema: z.ZodType<Prisma.PracticeResultUncheckedUpdateManyWithoutPracticeResultsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneResultUpdateWithoutUserInputSchema: z.ZodType<Prisma.SceneResultUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => SceneFragmentUpdateManyWithoutSceneResultNestedInputSchema).optional()
}).strict();

export const SceneResultUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SceneResultUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => SceneFragmentUncheckedUpdateManyWithoutSceneResultNestedInputSchema).optional()
}).strict();

export const SceneResultUncheckedUpdateManyWithoutSceneResultsInputSchema: z.ZodType<Prisma.SceneResultUncheckedUpdateManyWithoutSceneResultsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  correct: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelFragmentUpdateWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentUpdateWithoutLevelInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelFragmentUncheckedUpdateWithoutLevelInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedUpdateWithoutLevelInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelFragmentUncheckedUpdateManyWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedUpdateManyWithoutFragmentsInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelFragmentUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentUpdateWithoutFragmentInput> = z.object({
  level: z.lazy(() => LevelUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const LevelFragmentUncheckedUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedUpdateWithoutFragmentInput> = z.object({
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelFragmentUncheckedUpdateManyWithoutLevelsInputSchema: z.ZodType<Prisma.LevelFragmentUncheckedUpdateManyWithoutLevelsInput> = z.object({
  levelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateWithoutFragmentInput> = z.object({
  levelResult: z.lazy(() => LevelResultUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const LevelResultFragmentUncheckedUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedUpdateWithoutFragmentInput> = z.object({
  levelResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentUncheckedUpdateManyWithoutLevelResultsInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedUpdateManyWithoutLevelResultsInput> = z.object({
  levelResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteFragmentUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentUpdateWithoutFragmentInput> = z.object({
  note: z.lazy(() => NoteUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const NoteFragmentUncheckedUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedUpdateWithoutFragmentInput> = z.object({
  noteId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteFragmentUncheckedUpdateManyWithoutNotesInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedUpdateManyWithoutNotesInput> = z.object({
  noteId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeFragmentUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateWithoutFragmentInput> = z.object({
  practiceResult: z.lazy(() => PracticeResultUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const PracticeFragmentUncheckedUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedUpdateWithoutFragmentInput> = z.object({
  practiceResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeFragmentUncheckedUpdateManyWithoutPracticeResultsInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedUpdateManyWithoutPracticeResultsInput> = z.object({
  practiceResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneFragmentUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentUpdateWithoutFragmentInput> = z.object({
  sceneResult: z.lazy(() => SceneResultUpdateOneRequiredWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const SceneFragmentUncheckedUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedUpdateWithoutFragmentInput> = z.object({
  sceneResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneFragmentUncheckedUpdateManyWithoutSceneResultsInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedUpdateManyWithoutSceneResultsInput> = z.object({
  sceneResultId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteFragmentUpdateWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentUpdateWithoutNoteInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutNotesNestedInputSchema).optional()
}).strict();

export const NoteFragmentUncheckedUpdateWithoutNoteInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedUpdateWithoutNoteInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteFragmentUncheckedUpdateManyWithoutFragmentsInputSchema: z.ZodType<Prisma.NoteFragmentUncheckedUpdateManyWithoutFragmentsInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentUpdateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentUpdateWithoutLevelResultInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutLevelResultsNestedInputSchema).optional()
}).strict();

export const LevelResultFragmentUncheckedUpdateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedUpdateWithoutLevelResultInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentUncheckedUpdateManyWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelResultFragmentUncheckedUpdateManyWithoutFragmentsInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeFragmentUpdateWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentUpdateWithoutPracticeResultInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutPracticeResultsNestedInputSchema).optional()
}).strict();

export const PracticeFragmentUncheckedUpdateWithoutPracticeResultInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedUpdateWithoutPracticeResultInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PracticeFragmentUncheckedUpdateManyWithoutFragmentsInputSchema: z.ZodType<Prisma.PracticeFragmentUncheckedUpdateManyWithoutFragmentsInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneFragmentUpdateWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentUpdateWithoutSceneResultInput> = z.object({
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutSceneResultsNestedInputSchema).optional()
}).strict();

export const SceneFragmentUncheckedUpdateWithoutSceneResultInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedUpdateWithoutSceneResultInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SceneFragmentUncheckedUpdateManyWithoutFragmentsInputSchema: z.ZodType<Prisma.SceneFragmentUncheckedUpdateManyWithoutFragmentsInput> = z.object({
  fragmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ExampleFindFirstArgsSchema: z.ZodType<Prisma.ExampleFindFirstArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExampleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExampleFindFirstOrThrowArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExampleFindManyArgsSchema: z.ZodType<Prisma.ExampleFindManyArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExampleAggregateArgsSchema: z.ZodType<Prisma.ExampleAggregateArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExampleGroupByArgsSchema: z.ZodType<Prisma.ExampleGroupByArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithAggregationInputSchema.array(),ExampleOrderByWithAggregationInputSchema ]).optional(),
  by: ExampleScalarFieldEnumSchema.array(),
  having: ExampleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExampleFindUniqueArgsSchema: z.ZodType<Prisma.ExampleFindUniqueArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export const ExampleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExampleFindUniqueOrThrowArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const LevelFindFirstArgsSchema: z.ZodType<Prisma.LevelFindFirstArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  where: LevelWhereInputSchema.optional(),
  orderBy: z.union([ LevelOrderByWithRelationInputSchema.array(),LevelOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LevelFindFirstOrThrowArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  where: LevelWhereInputSchema.optional(),
  orderBy: z.union([ LevelOrderByWithRelationInputSchema.array(),LevelOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelFindManyArgsSchema: z.ZodType<Prisma.LevelFindManyArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  where: LevelWhereInputSchema.optional(),
  orderBy: z.union([ LevelOrderByWithRelationInputSchema.array(),LevelOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelAggregateArgsSchema: z.ZodType<Prisma.LevelAggregateArgs> = z.object({
  where: LevelWhereInputSchema.optional(),
  orderBy: z.union([ LevelOrderByWithRelationInputSchema.array(),LevelOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelGroupByArgsSchema: z.ZodType<Prisma.LevelGroupByArgs> = z.object({
  where: LevelWhereInputSchema.optional(),
  orderBy: z.union([ LevelOrderByWithAggregationInputSchema.array(),LevelOrderByWithAggregationInputSchema ]).optional(),
  by: LevelScalarFieldEnumSchema.array(),
  having: LevelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelFindUniqueArgsSchema: z.ZodType<Prisma.LevelFindUniqueArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  where: LevelWhereUniqueInputSchema,
}).strict()

export const LevelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LevelFindUniqueOrThrowArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  where: LevelWhereUniqueInputSchema,
}).strict()

export const LevelFragmentFindFirstArgsSchema: z.ZodType<Prisma.LevelFragmentFindFirstArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  where: LevelFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelFragmentOrderByWithRelationInputSchema.array(),LevelFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelFragmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LevelFragmentFindFirstOrThrowArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  where: LevelFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelFragmentOrderByWithRelationInputSchema.array(),LevelFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelFragmentFindManyArgsSchema: z.ZodType<Prisma.LevelFragmentFindManyArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  where: LevelFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelFragmentOrderByWithRelationInputSchema.array(),LevelFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelFragmentAggregateArgsSchema: z.ZodType<Prisma.LevelFragmentAggregateArgs> = z.object({
  where: LevelFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelFragmentOrderByWithRelationInputSchema.array(),LevelFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelFragmentGroupByArgsSchema: z.ZodType<Prisma.LevelFragmentGroupByArgs> = z.object({
  where: LevelFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelFragmentOrderByWithAggregationInputSchema.array(),LevelFragmentOrderByWithAggregationInputSchema ]).optional(),
  by: LevelFragmentScalarFieldEnumSchema.array(),
  having: LevelFragmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelFragmentFindUniqueArgsSchema: z.ZodType<Prisma.LevelFragmentFindUniqueArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  where: LevelFragmentWhereUniqueInputSchema,
}).strict()

export const LevelFragmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LevelFragmentFindUniqueOrThrowArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  where: LevelFragmentWhereUniqueInputSchema,
}).strict()

export const FragmentFindFirstArgsSchema: z.ZodType<Prisma.FragmentFindFirstArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  where: FragmentWhereInputSchema.optional(),
  orderBy: z.union([ FragmentOrderByWithRelationInputSchema.array(),FragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: FragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const FragmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FragmentFindFirstOrThrowArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  where: FragmentWhereInputSchema.optional(),
  orderBy: z.union([ FragmentOrderByWithRelationInputSchema.array(),FragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: FragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const FragmentFindManyArgsSchema: z.ZodType<Prisma.FragmentFindManyArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  where: FragmentWhereInputSchema.optional(),
  orderBy: z.union([ FragmentOrderByWithRelationInputSchema.array(),FragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: FragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const FragmentAggregateArgsSchema: z.ZodType<Prisma.FragmentAggregateArgs> = z.object({
  where: FragmentWhereInputSchema.optional(),
  orderBy: z.union([ FragmentOrderByWithRelationInputSchema.array(),FragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: FragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FragmentGroupByArgsSchema: z.ZodType<Prisma.FragmentGroupByArgs> = z.object({
  where: FragmentWhereInputSchema.optional(),
  orderBy: z.union([ FragmentOrderByWithAggregationInputSchema.array(),FragmentOrderByWithAggregationInputSchema ]).optional(),
  by: FragmentScalarFieldEnumSchema.array(),
  having: FragmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FragmentFindUniqueArgsSchema: z.ZodType<Prisma.FragmentFindUniqueArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  where: FragmentWhereUniqueInputSchema,
}).strict()

export const FragmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FragmentFindUniqueOrThrowArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  where: FragmentWhereUniqueInputSchema,
}).strict()

export const NoteFindFirstArgsSchema: z.ZodType<Prisma.NoteFindFirstArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const NoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NoteFindFirstOrThrowArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const NoteFindManyArgsSchema: z.ZodType<Prisma.NoteFindManyArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const NoteAggregateArgsSchema: z.ZodType<Prisma.NoteAggregateArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const NoteGroupByArgsSchema: z.ZodType<Prisma.NoteGroupByArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithAggregationInputSchema.array(),NoteOrderByWithAggregationInputSchema ]).optional(),
  by: NoteScalarFieldEnumSchema.array(),
  having: NoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const NoteFindUniqueArgsSchema: z.ZodType<Prisma.NoteFindUniqueArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict()

export const NoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NoteFindUniqueOrThrowArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict()

export const NoteFragmentFindFirstArgsSchema: z.ZodType<Prisma.NoteFragmentFindFirstArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  where: NoteFragmentWhereInputSchema.optional(),
  orderBy: z.union([ NoteFragmentOrderByWithRelationInputSchema.array(),NoteFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const NoteFragmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NoteFragmentFindFirstOrThrowArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  where: NoteFragmentWhereInputSchema.optional(),
  orderBy: z.union([ NoteFragmentOrderByWithRelationInputSchema.array(),NoteFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const NoteFragmentFindManyArgsSchema: z.ZodType<Prisma.NoteFragmentFindManyArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  where: NoteFragmentWhereInputSchema.optional(),
  orderBy: z.union([ NoteFragmentOrderByWithRelationInputSchema.array(),NoteFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const NoteFragmentAggregateArgsSchema: z.ZodType<Prisma.NoteFragmentAggregateArgs> = z.object({
  where: NoteFragmentWhereInputSchema.optional(),
  orderBy: z.union([ NoteFragmentOrderByWithRelationInputSchema.array(),NoteFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const NoteFragmentGroupByArgsSchema: z.ZodType<Prisma.NoteFragmentGroupByArgs> = z.object({
  where: NoteFragmentWhereInputSchema.optional(),
  orderBy: z.union([ NoteFragmentOrderByWithAggregationInputSchema.array(),NoteFragmentOrderByWithAggregationInputSchema ]).optional(),
  by: NoteFragmentScalarFieldEnumSchema.array(),
  having: NoteFragmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const NoteFragmentFindUniqueArgsSchema: z.ZodType<Prisma.NoteFragmentFindUniqueArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  where: NoteFragmentWhereUniqueInputSchema,
}).strict()

export const NoteFragmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NoteFragmentFindUniqueOrThrowArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  where: NoteFragmentWhereUniqueInputSchema,
}).strict()

export const LevelResultFragmentFindFirstArgsSchema: z.ZodType<Prisma.LevelResultFragmentFindFirstArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  where: LevelResultFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentOrderByWithRelationInputSchema.array(),LevelResultFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultFragmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LevelResultFragmentFindFirstOrThrowArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  where: LevelResultFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentOrderByWithRelationInputSchema.array(),LevelResultFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultFragmentFindManyArgsSchema: z.ZodType<Prisma.LevelResultFragmentFindManyArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  where: LevelResultFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentOrderByWithRelationInputSchema.array(),LevelResultFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultFragmentAggregateArgsSchema: z.ZodType<Prisma.LevelResultFragmentAggregateArgs> = z.object({
  where: LevelResultFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentOrderByWithRelationInputSchema.array(),LevelResultFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelResultFragmentGroupByArgsSchema: z.ZodType<Prisma.LevelResultFragmentGroupByArgs> = z.object({
  where: LevelResultFragmentWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentOrderByWithAggregationInputSchema.array(),LevelResultFragmentOrderByWithAggregationInputSchema ]).optional(),
  by: LevelResultFragmentScalarFieldEnumSchema.array(),
  having: LevelResultFragmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelResultFragmentFindUniqueArgsSchema: z.ZodType<Prisma.LevelResultFragmentFindUniqueArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  where: LevelResultFragmentWhereUniqueInputSchema,
}).strict()

export const LevelResultFragmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LevelResultFragmentFindUniqueOrThrowArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  where: LevelResultFragmentWhereUniqueInputSchema,
}).strict()

export const PracticeFragmentFindFirstArgsSchema: z.ZodType<Prisma.PracticeFragmentFindFirstArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  where: PracticeFragmentWhereInputSchema.optional(),
  orderBy: z.union([ PracticeFragmentOrderByWithRelationInputSchema.array(),PracticeFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: PracticeFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PracticeFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const PracticeFragmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PracticeFragmentFindFirstOrThrowArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  where: PracticeFragmentWhereInputSchema.optional(),
  orderBy: z.union([ PracticeFragmentOrderByWithRelationInputSchema.array(),PracticeFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: PracticeFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PracticeFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const PracticeFragmentFindManyArgsSchema: z.ZodType<Prisma.PracticeFragmentFindManyArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  where: PracticeFragmentWhereInputSchema.optional(),
  orderBy: z.union([ PracticeFragmentOrderByWithRelationInputSchema.array(),PracticeFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: PracticeFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PracticeFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const PracticeFragmentAggregateArgsSchema: z.ZodType<Prisma.PracticeFragmentAggregateArgs> = z.object({
  where: PracticeFragmentWhereInputSchema.optional(),
  orderBy: z.union([ PracticeFragmentOrderByWithRelationInputSchema.array(),PracticeFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: PracticeFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PracticeFragmentGroupByArgsSchema: z.ZodType<Prisma.PracticeFragmentGroupByArgs> = z.object({
  where: PracticeFragmentWhereInputSchema.optional(),
  orderBy: z.union([ PracticeFragmentOrderByWithAggregationInputSchema.array(),PracticeFragmentOrderByWithAggregationInputSchema ]).optional(),
  by: PracticeFragmentScalarFieldEnumSchema.array(),
  having: PracticeFragmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PracticeFragmentFindUniqueArgsSchema: z.ZodType<Prisma.PracticeFragmentFindUniqueArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  where: PracticeFragmentWhereUniqueInputSchema,
}).strict()

export const PracticeFragmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PracticeFragmentFindUniqueOrThrowArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  where: PracticeFragmentWhereUniqueInputSchema,
}).strict()

export const SceneFragmentFindFirstArgsSchema: z.ZodType<Prisma.SceneFragmentFindFirstArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  where: SceneFragmentWhereInputSchema.optional(),
  orderBy: z.union([ SceneFragmentOrderByWithRelationInputSchema.array(),SceneFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: SceneFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SceneFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const SceneFragmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SceneFragmentFindFirstOrThrowArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  where: SceneFragmentWhereInputSchema.optional(),
  orderBy: z.union([ SceneFragmentOrderByWithRelationInputSchema.array(),SceneFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: SceneFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SceneFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const SceneFragmentFindManyArgsSchema: z.ZodType<Prisma.SceneFragmentFindManyArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  where: SceneFragmentWhereInputSchema.optional(),
  orderBy: z.union([ SceneFragmentOrderByWithRelationInputSchema.array(),SceneFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: SceneFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SceneFragmentScalarFieldEnumSchema.array().optional(),
}).strict()

export const SceneFragmentAggregateArgsSchema: z.ZodType<Prisma.SceneFragmentAggregateArgs> = z.object({
  where: SceneFragmentWhereInputSchema.optional(),
  orderBy: z.union([ SceneFragmentOrderByWithRelationInputSchema.array(),SceneFragmentOrderByWithRelationInputSchema ]).optional(),
  cursor: SceneFragmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SceneFragmentGroupByArgsSchema: z.ZodType<Prisma.SceneFragmentGroupByArgs> = z.object({
  where: SceneFragmentWhereInputSchema.optional(),
  orderBy: z.union([ SceneFragmentOrderByWithAggregationInputSchema.array(),SceneFragmentOrderByWithAggregationInputSchema ]).optional(),
  by: SceneFragmentScalarFieldEnumSchema.array(),
  having: SceneFragmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SceneFragmentFindUniqueArgsSchema: z.ZodType<Prisma.SceneFragmentFindUniqueArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  where: SceneFragmentWhereUniqueInputSchema,
}).strict()

export const SceneFragmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SceneFragmentFindUniqueOrThrowArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  where: SceneFragmentWhereUniqueInputSchema,
}).strict()

export const LevelResultFindFirstArgsSchema: z.ZodType<Prisma.LevelResultFindFirstArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  where: LevelResultWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultOrderByWithRelationInputSchema.array(),LevelResultOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LevelResultFindFirstOrThrowArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  where: LevelResultWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultOrderByWithRelationInputSchema.array(),LevelResultOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultFindManyArgsSchema: z.ZodType<Prisma.LevelResultFindManyArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  where: LevelResultWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultOrderByWithRelationInputSchema.array(),LevelResultOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultAggregateArgsSchema: z.ZodType<Prisma.LevelResultAggregateArgs> = z.object({
  where: LevelResultWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultOrderByWithRelationInputSchema.array(),LevelResultOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelResultGroupByArgsSchema: z.ZodType<Prisma.LevelResultGroupByArgs> = z.object({
  where: LevelResultWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultOrderByWithAggregationInputSchema.array(),LevelResultOrderByWithAggregationInputSchema ]).optional(),
  by: LevelResultScalarFieldEnumSchema.array(),
  having: LevelResultScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelResultFindUniqueArgsSchema: z.ZodType<Prisma.LevelResultFindUniqueArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  where: LevelResultWhereUniqueInputSchema,
}).strict()

export const LevelResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LevelResultFindUniqueOrThrowArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  where: LevelResultWhereUniqueInputSchema,
}).strict()

export const PracticeResultFindFirstArgsSchema: z.ZodType<Prisma.PracticeResultFindFirstArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  where: PracticeResultWhereInputSchema.optional(),
  orderBy: z.union([ PracticeResultOrderByWithRelationInputSchema.array(),PracticeResultOrderByWithRelationInputSchema ]).optional(),
  cursor: PracticeResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PracticeResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const PracticeResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PracticeResultFindFirstOrThrowArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  where: PracticeResultWhereInputSchema.optional(),
  orderBy: z.union([ PracticeResultOrderByWithRelationInputSchema.array(),PracticeResultOrderByWithRelationInputSchema ]).optional(),
  cursor: PracticeResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PracticeResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const PracticeResultFindManyArgsSchema: z.ZodType<Prisma.PracticeResultFindManyArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  where: PracticeResultWhereInputSchema.optional(),
  orderBy: z.union([ PracticeResultOrderByWithRelationInputSchema.array(),PracticeResultOrderByWithRelationInputSchema ]).optional(),
  cursor: PracticeResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PracticeResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const PracticeResultAggregateArgsSchema: z.ZodType<Prisma.PracticeResultAggregateArgs> = z.object({
  where: PracticeResultWhereInputSchema.optional(),
  orderBy: z.union([ PracticeResultOrderByWithRelationInputSchema.array(),PracticeResultOrderByWithRelationInputSchema ]).optional(),
  cursor: PracticeResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PracticeResultGroupByArgsSchema: z.ZodType<Prisma.PracticeResultGroupByArgs> = z.object({
  where: PracticeResultWhereInputSchema.optional(),
  orderBy: z.union([ PracticeResultOrderByWithAggregationInputSchema.array(),PracticeResultOrderByWithAggregationInputSchema ]).optional(),
  by: PracticeResultScalarFieldEnumSchema.array(),
  having: PracticeResultScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PracticeResultFindUniqueArgsSchema: z.ZodType<Prisma.PracticeResultFindUniqueArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  where: PracticeResultWhereUniqueInputSchema,
}).strict()

export const PracticeResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PracticeResultFindUniqueOrThrowArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  where: PracticeResultWhereUniqueInputSchema,
}).strict()

export const SceneResultFindFirstArgsSchema: z.ZodType<Prisma.SceneResultFindFirstArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  where: SceneResultWhereInputSchema.optional(),
  orderBy: z.union([ SceneResultOrderByWithRelationInputSchema.array(),SceneResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SceneResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SceneResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const SceneResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SceneResultFindFirstOrThrowArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  where: SceneResultWhereInputSchema.optional(),
  orderBy: z.union([ SceneResultOrderByWithRelationInputSchema.array(),SceneResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SceneResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SceneResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const SceneResultFindManyArgsSchema: z.ZodType<Prisma.SceneResultFindManyArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  where: SceneResultWhereInputSchema.optional(),
  orderBy: z.union([ SceneResultOrderByWithRelationInputSchema.array(),SceneResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SceneResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SceneResultScalarFieldEnumSchema.array().optional(),
}).strict()

export const SceneResultAggregateArgsSchema: z.ZodType<Prisma.SceneResultAggregateArgs> = z.object({
  where: SceneResultWhereInputSchema.optional(),
  orderBy: z.union([ SceneResultOrderByWithRelationInputSchema.array(),SceneResultOrderByWithRelationInputSchema ]).optional(),
  cursor: SceneResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SceneResultGroupByArgsSchema: z.ZodType<Prisma.SceneResultGroupByArgs> = z.object({
  where: SceneResultWhereInputSchema.optional(),
  orderBy: z.union([ SceneResultOrderByWithAggregationInputSchema.array(),SceneResultOrderByWithAggregationInputSchema ]).optional(),
  by: SceneResultScalarFieldEnumSchema.array(),
  having: SceneResultScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SceneResultFindUniqueArgsSchema: z.ZodType<Prisma.SceneResultFindUniqueArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  where: SceneResultWhereUniqueInputSchema,
}).strict()

export const SceneResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SceneResultFindUniqueOrThrowArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  where: SceneResultWhereUniqueInputSchema,
}).strict()

export const ExampleCreateArgsSchema: z.ZodType<Prisma.ExampleCreateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  data: z.union([ ExampleCreateInputSchema,ExampleUncheckedCreateInputSchema ]),
}).strict()

export const ExampleUpsertArgsSchema: z.ZodType<Prisma.ExampleUpsertArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
  create: z.union([ ExampleCreateInputSchema,ExampleUncheckedCreateInputSchema ]),
  update: z.union([ ExampleUpdateInputSchema,ExampleUncheckedUpdateInputSchema ]),
}).strict()

export const ExampleDeleteArgsSchema: z.ZodType<Prisma.ExampleDeleteArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export const ExampleUpdateArgsSchema: z.ZodType<Prisma.ExampleUpdateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  data: z.union([ ExampleUpdateInputSchema,ExampleUncheckedUpdateInputSchema ]),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export const ExampleUpdateManyArgsSchema: z.ZodType<Prisma.ExampleUpdateManyArgs> = z.object({
  data: z.union([ ExampleUpdateManyMutationInputSchema,ExampleUncheckedUpdateManyInputSchema ]),
  where: ExampleWhereInputSchema.optional(),
}).strict()

export const ExampleDeleteManyArgsSchema: z.ZodType<Prisma.ExampleDeleteManyArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const LevelCreateArgsSchema: z.ZodType<Prisma.LevelCreateArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  data: z.union([ LevelCreateInputSchema,LevelUncheckedCreateInputSchema ]),
}).strict()

export const LevelUpsertArgsSchema: z.ZodType<Prisma.LevelUpsertArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  where: LevelWhereUniqueInputSchema,
  create: z.union([ LevelCreateInputSchema,LevelUncheckedCreateInputSchema ]),
  update: z.union([ LevelUpdateInputSchema,LevelUncheckedUpdateInputSchema ]),
}).strict()

export const LevelDeleteArgsSchema: z.ZodType<Prisma.LevelDeleteArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  where: LevelWhereUniqueInputSchema,
}).strict()

export const LevelUpdateArgsSchema: z.ZodType<Prisma.LevelUpdateArgs> = z.object({
  select: LevelSelectSchema.optional(),
  include: LevelIncludeSchema.optional(),
  data: z.union([ LevelUpdateInputSchema,LevelUncheckedUpdateInputSchema ]),
  where: LevelWhereUniqueInputSchema,
}).strict()

export const LevelUpdateManyArgsSchema: z.ZodType<Prisma.LevelUpdateManyArgs> = z.object({
  data: z.union([ LevelUpdateManyMutationInputSchema,LevelUncheckedUpdateManyInputSchema ]),
  where: LevelWhereInputSchema.optional(),
}).strict()

export const LevelDeleteManyArgsSchema: z.ZodType<Prisma.LevelDeleteManyArgs> = z.object({
  where: LevelWhereInputSchema.optional(),
}).strict()

export const LevelFragmentCreateArgsSchema: z.ZodType<Prisma.LevelFragmentCreateArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  data: z.union([ LevelFragmentCreateInputSchema,LevelFragmentUncheckedCreateInputSchema ]),
}).strict()

export const LevelFragmentUpsertArgsSchema: z.ZodType<Prisma.LevelFragmentUpsertArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  where: LevelFragmentWhereUniqueInputSchema,
  create: z.union([ LevelFragmentCreateInputSchema,LevelFragmentUncheckedCreateInputSchema ]),
  update: z.union([ LevelFragmentUpdateInputSchema,LevelFragmentUncheckedUpdateInputSchema ]),
}).strict()

export const LevelFragmentDeleteArgsSchema: z.ZodType<Prisma.LevelFragmentDeleteArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  where: LevelFragmentWhereUniqueInputSchema,
}).strict()

export const LevelFragmentUpdateArgsSchema: z.ZodType<Prisma.LevelFragmentUpdateArgs> = z.object({
  select: LevelFragmentSelectSchema.optional(),
  include: LevelFragmentIncludeSchema.optional(),
  data: z.union([ LevelFragmentUpdateInputSchema,LevelFragmentUncheckedUpdateInputSchema ]),
  where: LevelFragmentWhereUniqueInputSchema,
}).strict()

export const LevelFragmentUpdateManyArgsSchema: z.ZodType<Prisma.LevelFragmentUpdateManyArgs> = z.object({
  data: z.union([ LevelFragmentUpdateManyMutationInputSchema,LevelFragmentUncheckedUpdateManyInputSchema ]),
  where: LevelFragmentWhereInputSchema.optional(),
}).strict()

export const LevelFragmentDeleteManyArgsSchema: z.ZodType<Prisma.LevelFragmentDeleteManyArgs> = z.object({
  where: LevelFragmentWhereInputSchema.optional(),
}).strict()

export const FragmentCreateArgsSchema: z.ZodType<Prisma.FragmentCreateArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  data: z.union([ FragmentCreateInputSchema,FragmentUncheckedCreateInputSchema ]),
}).strict()

export const FragmentUpsertArgsSchema: z.ZodType<Prisma.FragmentUpsertArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  where: FragmentWhereUniqueInputSchema,
  create: z.union([ FragmentCreateInputSchema,FragmentUncheckedCreateInputSchema ]),
  update: z.union([ FragmentUpdateInputSchema,FragmentUncheckedUpdateInputSchema ]),
}).strict()

export const FragmentDeleteArgsSchema: z.ZodType<Prisma.FragmentDeleteArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  where: FragmentWhereUniqueInputSchema,
}).strict()

export const FragmentUpdateArgsSchema: z.ZodType<Prisma.FragmentUpdateArgs> = z.object({
  select: FragmentSelectSchema.optional(),
  include: FragmentIncludeSchema.optional(),
  data: z.union([ FragmentUpdateInputSchema,FragmentUncheckedUpdateInputSchema ]),
  where: FragmentWhereUniqueInputSchema,
}).strict()

export const FragmentUpdateManyArgsSchema: z.ZodType<Prisma.FragmentUpdateManyArgs> = z.object({
  data: z.union([ FragmentUpdateManyMutationInputSchema,FragmentUncheckedUpdateManyInputSchema ]),
  where: FragmentWhereInputSchema.optional(),
}).strict()

export const FragmentDeleteManyArgsSchema: z.ZodType<Prisma.FragmentDeleteManyArgs> = z.object({
  where: FragmentWhereInputSchema.optional(),
}).strict()

export const NoteCreateArgsSchema: z.ZodType<Prisma.NoteCreateArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  data: z.union([ NoteCreateInputSchema,NoteUncheckedCreateInputSchema ]),
}).strict()

export const NoteUpsertArgsSchema: z.ZodType<Prisma.NoteUpsertArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereUniqueInputSchema,
  create: z.union([ NoteCreateInputSchema,NoteUncheckedCreateInputSchema ]),
  update: z.union([ NoteUpdateInputSchema,NoteUncheckedUpdateInputSchema ]),
}).strict()

export const NoteDeleteArgsSchema: z.ZodType<Prisma.NoteDeleteArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict()

export const NoteUpdateArgsSchema: z.ZodType<Prisma.NoteUpdateArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  data: z.union([ NoteUpdateInputSchema,NoteUncheckedUpdateInputSchema ]),
  where: NoteWhereUniqueInputSchema,
}).strict()

export const NoteUpdateManyArgsSchema: z.ZodType<Prisma.NoteUpdateManyArgs> = z.object({
  data: z.union([ NoteUpdateManyMutationInputSchema,NoteUncheckedUpdateManyInputSchema ]),
  where: NoteWhereInputSchema.optional(),
}).strict()

export const NoteDeleteManyArgsSchema: z.ZodType<Prisma.NoteDeleteManyArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
}).strict()

export const NoteFragmentCreateArgsSchema: z.ZodType<Prisma.NoteFragmentCreateArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  data: z.union([ NoteFragmentCreateInputSchema,NoteFragmentUncheckedCreateInputSchema ]),
}).strict()

export const NoteFragmentUpsertArgsSchema: z.ZodType<Prisma.NoteFragmentUpsertArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  where: NoteFragmentWhereUniqueInputSchema,
  create: z.union([ NoteFragmentCreateInputSchema,NoteFragmentUncheckedCreateInputSchema ]),
  update: z.union([ NoteFragmentUpdateInputSchema,NoteFragmentUncheckedUpdateInputSchema ]),
}).strict()

export const NoteFragmentDeleteArgsSchema: z.ZodType<Prisma.NoteFragmentDeleteArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  where: NoteFragmentWhereUniqueInputSchema,
}).strict()

export const NoteFragmentUpdateArgsSchema: z.ZodType<Prisma.NoteFragmentUpdateArgs> = z.object({
  select: NoteFragmentSelectSchema.optional(),
  include: NoteFragmentIncludeSchema.optional(),
  data: z.union([ NoteFragmentUpdateInputSchema,NoteFragmentUncheckedUpdateInputSchema ]),
  where: NoteFragmentWhereUniqueInputSchema,
}).strict()

export const NoteFragmentUpdateManyArgsSchema: z.ZodType<Prisma.NoteFragmentUpdateManyArgs> = z.object({
  data: z.union([ NoteFragmentUpdateManyMutationInputSchema,NoteFragmentUncheckedUpdateManyInputSchema ]),
  where: NoteFragmentWhereInputSchema.optional(),
}).strict()

export const NoteFragmentDeleteManyArgsSchema: z.ZodType<Prisma.NoteFragmentDeleteManyArgs> = z.object({
  where: NoteFragmentWhereInputSchema.optional(),
}).strict()

export const LevelResultFragmentCreateArgsSchema: z.ZodType<Prisma.LevelResultFragmentCreateArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  data: z.union([ LevelResultFragmentCreateInputSchema,LevelResultFragmentUncheckedCreateInputSchema ]),
}).strict()

export const LevelResultFragmentUpsertArgsSchema: z.ZodType<Prisma.LevelResultFragmentUpsertArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  where: LevelResultFragmentWhereUniqueInputSchema,
  create: z.union([ LevelResultFragmentCreateInputSchema,LevelResultFragmentUncheckedCreateInputSchema ]),
  update: z.union([ LevelResultFragmentUpdateInputSchema,LevelResultFragmentUncheckedUpdateInputSchema ]),
}).strict()

export const LevelResultFragmentDeleteArgsSchema: z.ZodType<Prisma.LevelResultFragmentDeleteArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  where: LevelResultFragmentWhereUniqueInputSchema,
}).strict()

export const LevelResultFragmentUpdateArgsSchema: z.ZodType<Prisma.LevelResultFragmentUpdateArgs> = z.object({
  select: LevelResultFragmentSelectSchema.optional(),
  include: LevelResultFragmentIncludeSchema.optional(),
  data: z.union([ LevelResultFragmentUpdateInputSchema,LevelResultFragmentUncheckedUpdateInputSchema ]),
  where: LevelResultFragmentWhereUniqueInputSchema,
}).strict()

export const LevelResultFragmentUpdateManyArgsSchema: z.ZodType<Prisma.LevelResultFragmentUpdateManyArgs> = z.object({
  data: z.union([ LevelResultFragmentUpdateManyMutationInputSchema,LevelResultFragmentUncheckedUpdateManyInputSchema ]),
  where: LevelResultFragmentWhereInputSchema.optional(),
}).strict()

export const LevelResultFragmentDeleteManyArgsSchema: z.ZodType<Prisma.LevelResultFragmentDeleteManyArgs> = z.object({
  where: LevelResultFragmentWhereInputSchema.optional(),
}).strict()

export const PracticeFragmentCreateArgsSchema: z.ZodType<Prisma.PracticeFragmentCreateArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  data: z.union([ PracticeFragmentCreateInputSchema,PracticeFragmentUncheckedCreateInputSchema ]),
}).strict()

export const PracticeFragmentUpsertArgsSchema: z.ZodType<Prisma.PracticeFragmentUpsertArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  where: PracticeFragmentWhereUniqueInputSchema,
  create: z.union([ PracticeFragmentCreateInputSchema,PracticeFragmentUncheckedCreateInputSchema ]),
  update: z.union([ PracticeFragmentUpdateInputSchema,PracticeFragmentUncheckedUpdateInputSchema ]),
}).strict()

export const PracticeFragmentDeleteArgsSchema: z.ZodType<Prisma.PracticeFragmentDeleteArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  where: PracticeFragmentWhereUniqueInputSchema,
}).strict()

export const PracticeFragmentUpdateArgsSchema: z.ZodType<Prisma.PracticeFragmentUpdateArgs> = z.object({
  select: PracticeFragmentSelectSchema.optional(),
  include: PracticeFragmentIncludeSchema.optional(),
  data: z.union([ PracticeFragmentUpdateInputSchema,PracticeFragmentUncheckedUpdateInputSchema ]),
  where: PracticeFragmentWhereUniqueInputSchema,
}).strict()

export const PracticeFragmentUpdateManyArgsSchema: z.ZodType<Prisma.PracticeFragmentUpdateManyArgs> = z.object({
  data: z.union([ PracticeFragmentUpdateManyMutationInputSchema,PracticeFragmentUncheckedUpdateManyInputSchema ]),
  where: PracticeFragmentWhereInputSchema.optional(),
}).strict()

export const PracticeFragmentDeleteManyArgsSchema: z.ZodType<Prisma.PracticeFragmentDeleteManyArgs> = z.object({
  where: PracticeFragmentWhereInputSchema.optional(),
}).strict()

export const SceneFragmentCreateArgsSchema: z.ZodType<Prisma.SceneFragmentCreateArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  data: z.union([ SceneFragmentCreateInputSchema,SceneFragmentUncheckedCreateInputSchema ]),
}).strict()

export const SceneFragmentUpsertArgsSchema: z.ZodType<Prisma.SceneFragmentUpsertArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  where: SceneFragmentWhereUniqueInputSchema,
  create: z.union([ SceneFragmentCreateInputSchema,SceneFragmentUncheckedCreateInputSchema ]),
  update: z.union([ SceneFragmentUpdateInputSchema,SceneFragmentUncheckedUpdateInputSchema ]),
}).strict()

export const SceneFragmentDeleteArgsSchema: z.ZodType<Prisma.SceneFragmentDeleteArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  where: SceneFragmentWhereUniqueInputSchema,
}).strict()

export const SceneFragmentUpdateArgsSchema: z.ZodType<Prisma.SceneFragmentUpdateArgs> = z.object({
  select: SceneFragmentSelectSchema.optional(),
  include: SceneFragmentIncludeSchema.optional(),
  data: z.union([ SceneFragmentUpdateInputSchema,SceneFragmentUncheckedUpdateInputSchema ]),
  where: SceneFragmentWhereUniqueInputSchema,
}).strict()

export const SceneFragmentUpdateManyArgsSchema: z.ZodType<Prisma.SceneFragmentUpdateManyArgs> = z.object({
  data: z.union([ SceneFragmentUpdateManyMutationInputSchema,SceneFragmentUncheckedUpdateManyInputSchema ]),
  where: SceneFragmentWhereInputSchema.optional(),
}).strict()

export const SceneFragmentDeleteManyArgsSchema: z.ZodType<Prisma.SceneFragmentDeleteManyArgs> = z.object({
  where: SceneFragmentWhereInputSchema.optional(),
}).strict()

export const LevelResultCreateArgsSchema: z.ZodType<Prisma.LevelResultCreateArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  data: z.union([ LevelResultCreateInputSchema,LevelResultUncheckedCreateInputSchema ]),
}).strict()

export const LevelResultUpsertArgsSchema: z.ZodType<Prisma.LevelResultUpsertArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  where: LevelResultWhereUniqueInputSchema,
  create: z.union([ LevelResultCreateInputSchema,LevelResultUncheckedCreateInputSchema ]),
  update: z.union([ LevelResultUpdateInputSchema,LevelResultUncheckedUpdateInputSchema ]),
}).strict()

export const LevelResultDeleteArgsSchema: z.ZodType<Prisma.LevelResultDeleteArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  where: LevelResultWhereUniqueInputSchema,
}).strict()

export const LevelResultUpdateArgsSchema: z.ZodType<Prisma.LevelResultUpdateArgs> = z.object({
  select: LevelResultSelectSchema.optional(),
  include: LevelResultIncludeSchema.optional(),
  data: z.union([ LevelResultUpdateInputSchema,LevelResultUncheckedUpdateInputSchema ]),
  where: LevelResultWhereUniqueInputSchema,
}).strict()

export const LevelResultUpdateManyArgsSchema: z.ZodType<Prisma.LevelResultUpdateManyArgs> = z.object({
  data: z.union([ LevelResultUpdateManyMutationInputSchema,LevelResultUncheckedUpdateManyInputSchema ]),
  where: LevelResultWhereInputSchema.optional(),
}).strict()

export const LevelResultDeleteManyArgsSchema: z.ZodType<Prisma.LevelResultDeleteManyArgs> = z.object({
  where: LevelResultWhereInputSchema.optional(),
}).strict()

export const PracticeResultCreateArgsSchema: z.ZodType<Prisma.PracticeResultCreateArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  data: z.union([ PracticeResultCreateInputSchema,PracticeResultUncheckedCreateInputSchema ]),
}).strict()

export const PracticeResultUpsertArgsSchema: z.ZodType<Prisma.PracticeResultUpsertArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  where: PracticeResultWhereUniqueInputSchema,
  create: z.union([ PracticeResultCreateInputSchema,PracticeResultUncheckedCreateInputSchema ]),
  update: z.union([ PracticeResultUpdateInputSchema,PracticeResultUncheckedUpdateInputSchema ]),
}).strict()

export const PracticeResultDeleteArgsSchema: z.ZodType<Prisma.PracticeResultDeleteArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  where: PracticeResultWhereUniqueInputSchema,
}).strict()

export const PracticeResultUpdateArgsSchema: z.ZodType<Prisma.PracticeResultUpdateArgs> = z.object({
  select: PracticeResultSelectSchema.optional(),
  include: PracticeResultIncludeSchema.optional(),
  data: z.union([ PracticeResultUpdateInputSchema,PracticeResultUncheckedUpdateInputSchema ]),
  where: PracticeResultWhereUniqueInputSchema,
}).strict()

export const PracticeResultUpdateManyArgsSchema: z.ZodType<Prisma.PracticeResultUpdateManyArgs> = z.object({
  data: z.union([ PracticeResultUpdateManyMutationInputSchema,PracticeResultUncheckedUpdateManyInputSchema ]),
  where: PracticeResultWhereInputSchema.optional(),
}).strict()

export const PracticeResultDeleteManyArgsSchema: z.ZodType<Prisma.PracticeResultDeleteManyArgs> = z.object({
  where: PracticeResultWhereInputSchema.optional(),
}).strict()

export const SceneResultCreateArgsSchema: z.ZodType<Prisma.SceneResultCreateArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  data: z.union([ SceneResultCreateInputSchema,SceneResultUncheckedCreateInputSchema ]),
}).strict()

export const SceneResultUpsertArgsSchema: z.ZodType<Prisma.SceneResultUpsertArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  where: SceneResultWhereUniqueInputSchema,
  create: z.union([ SceneResultCreateInputSchema,SceneResultUncheckedCreateInputSchema ]),
  update: z.union([ SceneResultUpdateInputSchema,SceneResultUncheckedUpdateInputSchema ]),
}).strict()

export const SceneResultDeleteArgsSchema: z.ZodType<Prisma.SceneResultDeleteArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  where: SceneResultWhereUniqueInputSchema,
}).strict()

export const SceneResultUpdateArgsSchema: z.ZodType<Prisma.SceneResultUpdateArgs> = z.object({
  select: SceneResultSelectSchema.optional(),
  include: SceneResultIncludeSchema.optional(),
  data: z.union([ SceneResultUpdateInputSchema,SceneResultUncheckedUpdateInputSchema ]),
  where: SceneResultWhereUniqueInputSchema,
}).strict()

export const SceneResultUpdateManyArgsSchema: z.ZodType<Prisma.SceneResultUpdateManyArgs> = z.object({
  data: z.union([ SceneResultUpdateManyMutationInputSchema,SceneResultUncheckedUpdateManyInputSchema ]),
  where: SceneResultWhereInputSchema.optional(),
}).strict()

export const SceneResultDeleteManyArgsSchema: z.ZodType<Prisma.SceneResultDeleteManyArgs> = z.object({
  where: SceneResultWhereInputSchema.optional(),
}).strict()