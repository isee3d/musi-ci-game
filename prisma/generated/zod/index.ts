import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const FragmentScalarFieldEnumSchema = z.enum(['id','name','description']);

export const GameModeScalarFieldEnumSchema = z.enum(['id','id_levelResult','name']);

export const GameScalarFieldEnumSchema = z.enum(['id','name']);

export const KliniekScalarFieldEnumSchema = z.enum(['id','name']);

export const LevelResultFragmentAnswerScalarFieldEnumSchema = z.enum(['id','id_LevelResult','answeredCorrectly']);

export const LevelResultScalarFieldEnumSchema = z.enum(['id','id_User','playDate','startTime','endTime','timesListenedAgain','transposed','reactionTime']);

export const LevelScalarFieldEnumSchema = z.enum(['id','id_Game','id_levelResult','name','description','BPM','correctAnswers','cooldownTime','fragmentToShow']);

export const NoteScalarFieldEnumSchema = z.enum(['id','id_Fragment','name','time','duration','speed']);

export const RestGehoorScalarFieldEnumSchema = z.enum(['id','created_at','restGehoor']);

export const RoleScalarFieldEnumSchema = z.enum(['id','name']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TeamScalarFieldEnumSchema = z.enum(['id','id_Kliniek','name','description']);

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const TypeCIScalarFieldEnumSchema = z.enum(['id','ciName','merk']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','id_restGehoor','id_TypeCI','id_Role','id_Team','hadTraining','experience','processor','entreeVragenLijst','createdAt']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
})

export type Account = z.infer<typeof AccountSchema>

// ACCOUNT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AccountOptionalDefaultsSchema = AccountSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCOUNT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AccountOptionalDefaultsWithRelations = z.infer<typeof AccountOptionalDefaultsSchema> & AccountRelations

export const AccountOptionalDefaultsWithRelationsSchema: z.ZodType<AccountOptionalDefaultsWithRelations> = AccountOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

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

// SESSION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SessionOptionalDefaultsSchema = SessionSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type SessionOptionalDefaults = z.infer<typeof SessionOptionalDefaultsSchema>

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
  user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// SESSION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type SessionOptionalDefaultsWithRelations = z.infer<typeof SessionOptionalDefaultsSchema> & SessionRelations

export const SessionOptionalDefaultsWithRelationsSchema: z.ZodType<SessionOptionalDefaultsWithRelations> = SessionOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

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
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.coerce.date().nullish(),
  image: z.string().nullish(),
  id_restGehoor: z.number().int().nullish(),
  id_TypeCI: z.number().int().nullish(),
  id_Role: z.number().int().nullish(),
  id_Team: z.number().int().nullish(),
  hadTraining: z.boolean(),
  experience: z.number().int(),
  processor: z.string().nullish(),
  entreeVragenLijst: z.string().nullish(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().cuid().optional(),
  hadTraining: z.boolean().optional(),
  experience: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
  restGehoor?: RestGehoorWithRelations | null;
  typeCI?: TypeCIWithRelations | null;
  role?: RoleWithRelations | null;
  team?: TeamWithRelations | null;
  levelResults: LevelResultWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  restGehoor: z.lazy(() => RestGehoorWithRelationsSchema).nullish(),
  typeCI: z.lazy(() => TypeCIWithRelationsSchema).nullish(),
  role: z.lazy(() => RoleWithRelationsSchema).nullish(),
  team: z.lazy(() => TeamWithRelationsSchema).nullish(),
  levelResults: z.lazy(() => LevelResultWithRelationsSchema).array(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  restGehoor: z.lazy(() => RestGehoorWithRelationsSchema).nullish(),
  typeCI: z.lazy(() => TypeCIWithRelationsSchema).nullish(),
  role: z.lazy(() => RoleWithRelationsSchema).nullish(),
  team: z.lazy(() => TeamWithRelationsSchema).nullish(),
  levelResults: z.lazy(() => LevelResultWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// REST GEHOOR SCHEMA
/////////////////////////////////////////

export const RestGehoorSchema = z.object({
  id: z.number().int(),
  created_at: z.coerce.date(),
  restGehoor: z.number().int(),
})

export type RestGehoor = z.infer<typeof RestGehoorSchema>

// REST GEHOOR OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RestGehoorOptionalDefaultsSchema = RestGehoorSchema.merge(z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
}))

export type RestGehoorOptionalDefaults = z.infer<typeof RestGehoorOptionalDefaultsSchema>

// REST GEHOOR RELATION SCHEMA
//------------------------------------------------------

export type RestGehoorRelations = {
  user: UserWithRelations[];
};

export type RestGehoorWithRelations = z.infer<typeof RestGehoorSchema> & RestGehoorRelations

export const RestGehoorWithRelationsSchema: z.ZodType<RestGehoorWithRelations> = RestGehoorSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).array(),
}))

// REST GEHOOR OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RestGehoorOptionalDefaultsWithRelations = z.infer<typeof RestGehoorOptionalDefaultsSchema> & RestGehoorRelations

export const RestGehoorOptionalDefaultsWithRelationsSchema: z.ZodType<RestGehoorOptionalDefaultsWithRelations> = RestGehoorOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TYPE CI SCHEMA
/////////////////////////////////////////

export const TypeCISchema = z.object({
  id: z.number().int(),
  ciName: z.string(),
  merk: z.string(),
})

export type TypeCI = z.infer<typeof TypeCISchema>

// TYPE CI OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TypeCIOptionalDefaultsSchema = TypeCISchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type TypeCIOptionalDefaults = z.infer<typeof TypeCIOptionalDefaultsSchema>

// TYPE CI RELATION SCHEMA
//------------------------------------------------------

export type TypeCIRelations = {
  user: UserWithRelations[];
};

export type TypeCIWithRelations = z.infer<typeof TypeCISchema> & TypeCIRelations

export const TypeCIWithRelationsSchema: z.ZodType<TypeCIWithRelations> = TypeCISchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).array(),
}))

// TYPE CI OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TypeCIOptionalDefaultsWithRelations = z.infer<typeof TypeCIOptionalDefaultsSchema> & TypeCIRelations

export const TypeCIOptionalDefaultsWithRelationsSchema: z.ZodType<TypeCIOptionalDefaultsWithRelations> = TypeCIOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Role = z.infer<typeof RoleSchema>

// ROLE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RoleOptionalDefaultsSchema = RoleSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type RoleOptionalDefaults = z.infer<typeof RoleOptionalDefaultsSchema>

// ROLE RELATION SCHEMA
//------------------------------------------------------

export type RoleRelations = {
  users: UserWithRelations[];
};

export type RoleWithRelations = z.infer<typeof RoleSchema> & RoleRelations

export const RoleWithRelationsSchema: z.ZodType<RoleWithRelations> = RoleSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array(),
}))

// ROLE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RoleOptionalDefaultsWithRelations = z.infer<typeof RoleOptionalDefaultsSchema> & RoleRelations

export const RoleOptionalDefaultsWithRelationsSchema: z.ZodType<RoleOptionalDefaultsWithRelations> = RoleOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// KLINIEK SCHEMA
/////////////////////////////////////////

export const KliniekSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Kliniek = z.infer<typeof KliniekSchema>

// KLINIEK OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const KliniekOptionalDefaultsSchema = KliniekSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type KliniekOptionalDefaults = z.infer<typeof KliniekOptionalDefaultsSchema>

// KLINIEK RELATION SCHEMA
//------------------------------------------------------

export type KliniekRelations = {
  team: TeamWithRelations[];
};

export type KliniekWithRelations = z.infer<typeof KliniekSchema> & KliniekRelations

export const KliniekWithRelationsSchema: z.ZodType<KliniekWithRelations> = KliniekSchema.merge(z.object({
  team: z.lazy(() => TeamWithRelationsSchema).array(),
}))

// KLINIEK OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type KliniekOptionalDefaultsWithRelations = z.infer<typeof KliniekOptionalDefaultsSchema> & KliniekRelations

export const KliniekOptionalDefaultsWithRelationsSchema: z.ZodType<KliniekOptionalDefaultsWithRelations> = KliniekOptionalDefaultsSchema.merge(z.object({
  team: z.lazy(() => TeamWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z.object({
  id: z.number().int(),
  id_Kliniek: z.number().int().nullish(),
  name: z.string(),
  description: z.string().nullish(),
})

export type Team = z.infer<typeof TeamSchema>

// TEAM OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TeamOptionalDefaultsSchema = TeamSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type TeamOptionalDefaults = z.infer<typeof TeamOptionalDefaultsSchema>

// TEAM RELATION SCHEMA
//------------------------------------------------------

export type TeamRelations = {
  kliniek?: KliniekWithRelations | null;
  users: UserWithRelations[];
  game: GameWithRelations[];
};

export type TeamWithRelations = z.infer<typeof TeamSchema> & TeamRelations

export const TeamWithRelationsSchema: z.ZodType<TeamWithRelations> = TeamSchema.merge(z.object({
  kliniek: z.lazy(() => KliniekWithRelationsSchema).nullish(),
  users: z.lazy(() => UserWithRelationsSchema).array(),
  game: z.lazy(() => GameWithRelationsSchema).array(),
}))

// TEAM OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TeamOptionalDefaultsWithRelations = z.infer<typeof TeamOptionalDefaultsSchema> & TeamRelations

export const TeamOptionalDefaultsWithRelationsSchema: z.ZodType<TeamOptionalDefaultsWithRelations> = TeamOptionalDefaultsSchema.merge(z.object({
  kliniek: z.lazy(() => KliniekWithRelationsSchema).nullish(),
  users: z.lazy(() => UserWithRelationsSchema).array(),
  game: z.lazy(() => GameWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// GAME SCHEMA
/////////////////////////////////////////

export const GameSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Game = z.infer<typeof GameSchema>

// GAME OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const GameOptionalDefaultsSchema = GameSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type GameOptionalDefaults = z.infer<typeof GameOptionalDefaultsSchema>

// GAME RELATION SCHEMA
//------------------------------------------------------

export type GameRelations = {
  teams: TeamWithRelations[];
  levels: LevelWithRelations[];
};

export type GameWithRelations = z.infer<typeof GameSchema> & GameRelations

export const GameWithRelationsSchema: z.ZodType<GameWithRelations> = GameSchema.merge(z.object({
  teams: z.lazy(() => TeamWithRelationsSchema).array(),
  levels: z.lazy(() => LevelWithRelationsSchema).array(),
}))

// GAME OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type GameOptionalDefaultsWithRelations = z.infer<typeof GameOptionalDefaultsSchema> & GameRelations

export const GameOptionalDefaultsWithRelationsSchema: z.ZodType<GameOptionalDefaultsWithRelations> = GameOptionalDefaultsSchema.merge(z.object({
  teams: z.lazy(() => TeamWithRelationsSchema).array(),
  levels: z.lazy(() => LevelWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// LEVEL SCHEMA
/////////////////////////////////////////

export const LevelSchema = z.object({
  id: z.number().int(),
  id_Game: z.number().int().nullish(),
  id_levelResult: z.number().int().nullish(),
  name: z.string(),
  description: z.string().nullish(),
  BPM: z.number().int(),
  correctAnswers: z.number().int(),
  cooldownTime: z.number().int().nullish(),
  fragmentToShow: z.number().int(),
})

export type Level = z.infer<typeof LevelSchema>

// LEVEL OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LevelOptionalDefaultsSchema = LevelSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type LevelOptionalDefaults = z.infer<typeof LevelOptionalDefaultsSchema>

// LEVEL RELATION SCHEMA
//------------------------------------------------------

export type LevelRelations = {
  game?: GameWithRelations | null;
  fragments: FragmentWithRelations[];
  gameModes: GameModeWithRelations[];
  levelResult?: LevelResultWithRelations | null;
};

export type LevelWithRelations = z.infer<typeof LevelSchema> & LevelRelations

export const LevelWithRelationsSchema: z.ZodType<LevelWithRelations> = LevelSchema.merge(z.object({
  game: z.lazy(() => GameWithRelationsSchema).nullish(),
  fragments: z.lazy(() => FragmentWithRelationsSchema).array(),
  gameModes: z.lazy(() => GameModeWithRelationsSchema).array(),
  levelResult: z.lazy(() => LevelResultWithRelationsSchema).nullish(),
}))

// LEVEL OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type LevelOptionalDefaultsWithRelations = z.infer<typeof LevelOptionalDefaultsSchema> & LevelRelations

export const LevelOptionalDefaultsWithRelationsSchema: z.ZodType<LevelOptionalDefaultsWithRelations> = LevelOptionalDefaultsSchema.merge(z.object({
  game: z.lazy(() => GameWithRelationsSchema).nullish(),
  fragments: z.lazy(() => FragmentWithRelationsSchema).array(),
  gameModes: z.lazy(() => GameModeWithRelationsSchema).array(),
  levelResult: z.lazy(() => LevelResultWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// FRAGMENT SCHEMA
/////////////////////////////////////////

export const FragmentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullish(),
})

export type Fragment = z.infer<typeof FragmentSchema>

// FRAGMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FragmentOptionalDefaultsSchema = FragmentSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type FragmentOptionalDefaults = z.infer<typeof FragmentOptionalDefaultsSchema>

// FRAGMENT RELATION SCHEMA
//------------------------------------------------------

export type FragmentRelations = {
  notes: NoteWithRelations[];
  level: LevelWithRelations[];
};

export type FragmentWithRelations = z.infer<typeof FragmentSchema> & FragmentRelations

export const FragmentWithRelationsSchema: z.ZodType<FragmentWithRelations> = FragmentSchema.merge(z.object({
  notes: z.lazy(() => NoteWithRelationsSchema).array(),
  level: z.lazy(() => LevelWithRelationsSchema).array(),
}))

// FRAGMENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type FragmentOptionalDefaultsWithRelations = z.infer<typeof FragmentOptionalDefaultsSchema> & FragmentRelations

export const FragmentOptionalDefaultsWithRelationsSchema: z.ZodType<FragmentOptionalDefaultsWithRelations> = FragmentOptionalDefaultsSchema.merge(z.object({
  notes: z.lazy(() => NoteWithRelationsSchema).array(),
  level: z.lazy(() => LevelWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// NOTE SCHEMA
/////////////////////////////////////////

export const NoteSchema = z.object({
  id: z.number().int(),
  id_Fragment: z.number().int(),
  name: z.string(),
  time: z.number().int(),
  duration: z.number().int(),
  speed: z.number().int(),
})

export type Note = z.infer<typeof NoteSchema>

// NOTE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const NoteOptionalDefaultsSchema = NoteSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type NoteOptionalDefaults = z.infer<typeof NoteOptionalDefaultsSchema>

// NOTE RELATION SCHEMA
//------------------------------------------------------

export type NoteRelations = {
  fragment: FragmentWithRelations;
};

export type NoteWithRelations = z.infer<typeof NoteSchema> & NoteRelations

export const NoteWithRelationsSchema: z.ZodType<NoteWithRelations> = NoteSchema.merge(z.object({
  fragment: z.lazy(() => FragmentWithRelationsSchema),
}))

// NOTE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type NoteOptionalDefaultsWithRelations = z.infer<typeof NoteOptionalDefaultsSchema> & NoteRelations

export const NoteOptionalDefaultsWithRelationsSchema: z.ZodType<NoteOptionalDefaultsWithRelations> = NoteOptionalDefaultsSchema.merge(z.object({
  fragment: z.lazy(() => FragmentWithRelationsSchema),
}))

/////////////////////////////////////////
// GAME MODE SCHEMA
/////////////////////////////////////////

export const GameModeSchema = z.object({
  id: z.number().int(),
  id_levelResult: z.number().int().nullish(),
  name: z.string(),
})

export type GameMode = z.infer<typeof GameModeSchema>

// GAME MODE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const GameModeOptionalDefaultsSchema = GameModeSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type GameModeOptionalDefaults = z.infer<typeof GameModeOptionalDefaultsSchema>

// GAME MODE RELATION SCHEMA
//------------------------------------------------------

export type GameModeRelations = {
  levels: LevelWithRelations[];
  levelResult?: LevelResultWithRelations | null;
};

export type GameModeWithRelations = z.infer<typeof GameModeSchema> & GameModeRelations

export const GameModeWithRelationsSchema: z.ZodType<GameModeWithRelations> = GameModeSchema.merge(z.object({
  levels: z.lazy(() => LevelWithRelationsSchema).array(),
  levelResult: z.lazy(() => LevelResultWithRelationsSchema).nullish(),
}))

// GAME MODE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type GameModeOptionalDefaultsWithRelations = z.infer<typeof GameModeOptionalDefaultsSchema> & GameModeRelations

export const GameModeOptionalDefaultsWithRelationsSchema: z.ZodType<GameModeOptionalDefaultsWithRelations> = GameModeOptionalDefaultsSchema.merge(z.object({
  levels: z.lazy(() => LevelWithRelationsSchema).array(),
  levelResult: z.lazy(() => LevelResultWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// LEVEL RESULT SCHEMA
/////////////////////////////////////////

export const LevelResultSchema = z.object({
  id: z.number().int(),
  id_User: z.string(),
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number().int(),
  transposed: z.number().int(),
  reactionTime: z.number().int(),
})

export type LevelResult = z.infer<typeof LevelResultSchema>

// LEVEL RESULT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LevelResultOptionalDefaultsSchema = LevelResultSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type LevelResultOptionalDefaults = z.infer<typeof LevelResultOptionalDefaultsSchema>

// LEVEL RESULT RELATION SCHEMA
//------------------------------------------------------

export type LevelResultRelations = {
  user: UserWithRelations;
  gameModes: GameModeWithRelations[];
  levels: LevelWithRelations[];
  levelResultFragmentAnswers: LevelResultFragmentAnswerWithRelations[];
};

export type LevelResultWithRelations = z.infer<typeof LevelResultSchema> & LevelResultRelations

export const LevelResultWithRelationsSchema: z.ZodType<LevelResultWithRelations> = LevelResultSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  gameModes: z.lazy(() => GameModeWithRelationsSchema).array(),
  levels: z.lazy(() => LevelWithRelationsSchema).array(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerWithRelationsSchema).array(),
}))

// LEVEL RESULT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type LevelResultOptionalDefaultsWithRelations = z.infer<typeof LevelResultOptionalDefaultsSchema> & LevelResultRelations

export const LevelResultOptionalDefaultsWithRelationsSchema: z.ZodType<LevelResultOptionalDefaultsWithRelations> = LevelResultOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  gameModes: z.lazy(() => GameModeWithRelationsSchema).array(),
  levels: z.lazy(() => LevelWithRelationsSchema).array(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// LEVEL RESULT FRAGMENT ANSWER SCHEMA
/////////////////////////////////////////

export const LevelResultFragmentAnswerSchema = z.object({
  id: z.number().int(),
  id_LevelResult: z.number().int(),
  answeredCorrectly: z.boolean(),
})

export type LevelResultFragmentAnswer = z.infer<typeof LevelResultFragmentAnswerSchema>

// LEVEL RESULT FRAGMENT ANSWER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LevelResultFragmentAnswerOptionalDefaultsSchema = LevelResultFragmentAnswerSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type LevelResultFragmentAnswerOptionalDefaults = z.infer<typeof LevelResultFragmentAnswerOptionalDefaultsSchema>

// LEVEL RESULT FRAGMENT ANSWER RELATION SCHEMA
//------------------------------------------------------

export type LevelResultFragmentAnswerRelations = {
  levelResult: LevelResultWithRelations;
};

export type LevelResultFragmentAnswerWithRelations = z.infer<typeof LevelResultFragmentAnswerSchema> & LevelResultFragmentAnswerRelations

export const LevelResultFragmentAnswerWithRelationsSchema: z.ZodType<LevelResultFragmentAnswerWithRelations> = LevelResultFragmentAnswerSchema.merge(z.object({
  levelResult: z.lazy(() => LevelResultWithRelationsSchema),
}))

// LEVEL RESULT FRAGMENT ANSWER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type LevelResultFragmentAnswerOptionalDefaultsWithRelations = z.infer<typeof LevelResultFragmentAnswerOptionalDefaultsSchema> & LevelResultFragmentAnswerRelations

export const LevelResultFragmentAnswerOptionalDefaultsWithRelationsSchema: z.ZodType<LevelResultFragmentAnswerOptionalDefaultsWithRelations> = LevelResultFragmentAnswerOptionalDefaultsSchema.merge(z.object({
  levelResult: z.lazy(() => LevelResultWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

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

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  restGehoor: z.union([z.boolean(),z.lazy(() => RestGehoorArgsSchema)]).optional(),
  typeCI: z.union([z.boolean(),z.lazy(() => TypeCIArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  levelResults: z.union([z.boolean(),z.lazy(() => LevelResultFindManyArgsSchema)]).optional(),
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
  sessions: z.boolean().optional(),
  levelResults: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  id_restGehoor: z.boolean().optional(),
  id_TypeCI: z.boolean().optional(),
  id_Role: z.boolean().optional(),
  id_Team: z.boolean().optional(),
  hadTraining: z.boolean().optional(),
  experience: z.boolean().optional(),
  processor: z.boolean().optional(),
  entreeVragenLijst: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  restGehoor: z.union([z.boolean(),z.lazy(() => RestGehoorArgsSchema)]).optional(),
  typeCI: z.union([z.boolean(),z.lazy(() => TypeCIArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  levelResults: z.union([z.boolean(),z.lazy(() => LevelResultFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REST GEHOOR
//------------------------------------------------------

export const RestGehoorIncludeSchema: z.ZodType<Prisma.RestGehoorInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RestGehoorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RestGehoorArgsSchema: z.ZodType<Prisma.RestGehoorArgs> = z.object({
  select: z.lazy(() => RestGehoorSelectSchema).optional(),
  include: z.lazy(() => RestGehoorIncludeSchema).optional(),
}).strict();

export const RestGehoorCountOutputTypeArgsSchema: z.ZodType<Prisma.RestGehoorCountOutputTypeArgs> = z.object({
  select: z.lazy(() => RestGehoorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RestGehoorCountOutputTypeSelectSchema: z.ZodType<Prisma.RestGehoorCountOutputTypeSelect> = z.object({
  user: z.boolean().optional(),
}).strict();

export const RestGehoorSelectSchema: z.ZodType<Prisma.RestGehoorSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  restGehoor: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RestGehoorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TYPE CI
//------------------------------------------------------

export const TypeCIIncludeSchema: z.ZodType<Prisma.TypeCIInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TypeCICountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TypeCIArgsSchema: z.ZodType<Prisma.TypeCIArgs> = z.object({
  select: z.lazy(() => TypeCISelectSchema).optional(),
  include: z.lazy(() => TypeCIIncludeSchema).optional(),
}).strict();

export const TypeCICountOutputTypeArgsSchema: z.ZodType<Prisma.TypeCICountOutputTypeArgs> = z.object({
  select: z.lazy(() => TypeCICountOutputTypeSelectSchema).nullish(),
}).strict();

export const TypeCICountOutputTypeSelectSchema: z.ZodType<Prisma.TypeCICountOutputTypeSelect> = z.object({
  user: z.boolean().optional(),
}).strict();

export const TypeCISelectSchema: z.ZodType<Prisma.TypeCISelect> = z.object({
  id: z.boolean().optional(),
  ciName: z.boolean().optional(),
  merk: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TypeCICountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLE
//------------------------------------------------------

export const RoleIncludeSchema: z.ZodType<Prisma.RoleInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoleArgsSchema: z.ZodType<Prisma.RoleArgs> = z.object({
  select: z.lazy(() => RoleSelectSchema).optional(),
  include: z.lazy(() => RoleIncludeSchema).optional(),
}).strict();

export const RoleCountOutputTypeArgsSchema: z.ZodType<Prisma.RoleCountOutputTypeArgs> = z.object({
  select: z.lazy(() => RoleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoleCountOutputTypeSelectSchema: z.ZodType<Prisma.RoleCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
}).strict();

export const RoleSelectSchema: z.ZodType<Prisma.RoleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// KLINIEK
//------------------------------------------------------

export const KliniekIncludeSchema: z.ZodType<Prisma.KliniekInclude> = z.object({
  team: z.union([z.boolean(),z.lazy(() => TeamFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => KliniekCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const KliniekArgsSchema: z.ZodType<Prisma.KliniekArgs> = z.object({
  select: z.lazy(() => KliniekSelectSchema).optional(),
  include: z.lazy(() => KliniekIncludeSchema).optional(),
}).strict();

export const KliniekCountOutputTypeArgsSchema: z.ZodType<Prisma.KliniekCountOutputTypeArgs> = z.object({
  select: z.lazy(() => KliniekCountOutputTypeSelectSchema).nullish(),
}).strict();

export const KliniekCountOutputTypeSelectSchema: z.ZodType<Prisma.KliniekCountOutputTypeSelect> = z.object({
  team: z.boolean().optional(),
}).strict();

export const KliniekSelectSchema: z.ZodType<Prisma.KliniekSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => KliniekCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TEAM
//------------------------------------------------------

export const TeamIncludeSchema: z.ZodType<Prisma.TeamInclude> = z.object({
  kliniek: z.union([z.boolean(),z.lazy(() => KliniekArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  game: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TeamCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TeamArgsSchema: z.ZodType<Prisma.TeamArgs> = z.object({
  select: z.lazy(() => TeamSelectSchema).optional(),
  include: z.lazy(() => TeamIncludeSchema).optional(),
}).strict();

export const TeamCountOutputTypeArgsSchema: z.ZodType<Prisma.TeamCountOutputTypeArgs> = z.object({
  select: z.lazy(() => TeamCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TeamCountOutputTypeSelectSchema: z.ZodType<Prisma.TeamCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  game: z.boolean().optional(),
}).strict();

export const TeamSelectSchema: z.ZodType<Prisma.TeamSelect> = z.object({
  id: z.boolean().optional(),
  id_Kliniek: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  kliniek: z.union([z.boolean(),z.lazy(() => KliniekArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  game: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TeamCountOutputTypeArgsSchema)]).optional(),
}).strict()

// GAME
//------------------------------------------------------

export const GameIncludeSchema: z.ZodType<Prisma.GameInclude> = z.object({
  teams: z.union([z.boolean(),z.lazy(() => TeamFindManyArgsSchema)]).optional(),
  levels: z.union([z.boolean(),z.lazy(() => LevelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GameCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GameArgsSchema: z.ZodType<Prisma.GameArgs> = z.object({
  select: z.lazy(() => GameSelectSchema).optional(),
  include: z.lazy(() => GameIncludeSchema).optional(),
}).strict();

export const GameCountOutputTypeArgsSchema: z.ZodType<Prisma.GameCountOutputTypeArgs> = z.object({
  select: z.lazy(() => GameCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GameCountOutputTypeSelectSchema: z.ZodType<Prisma.GameCountOutputTypeSelect> = z.object({
  teams: z.boolean().optional(),
  levels: z.boolean().optional(),
}).strict();

export const GameSelectSchema: z.ZodType<Prisma.GameSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  teams: z.union([z.boolean(),z.lazy(() => TeamFindManyArgsSchema)]).optional(),
  levels: z.union([z.boolean(),z.lazy(() => LevelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GameCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LEVEL
//------------------------------------------------------

export const LevelIncludeSchema: z.ZodType<Prisma.LevelInclude> = z.object({
  game: z.union([z.boolean(),z.lazy(() => GameArgsSchema)]).optional(),
  fragments: z.union([z.boolean(),z.lazy(() => FragmentFindManyArgsSchema)]).optional(),
  gameModes: z.union([z.boolean(),z.lazy(() => GameModeFindManyArgsSchema)]).optional(),
  levelResult: z.union([z.boolean(),z.lazy(() => LevelResultArgsSchema)]).optional(),
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
  gameModes: z.boolean().optional(),
}).strict();

export const LevelSelectSchema: z.ZodType<Prisma.LevelSelect> = z.object({
  id: z.boolean().optional(),
  id_Game: z.boolean().optional(),
  id_levelResult: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  BPM: z.boolean().optional(),
  correctAnswers: z.boolean().optional(),
  cooldownTime: z.boolean().optional(),
  fragmentToShow: z.boolean().optional(),
  game: z.union([z.boolean(),z.lazy(() => GameArgsSchema)]).optional(),
  fragments: z.union([z.boolean(),z.lazy(() => FragmentFindManyArgsSchema)]).optional(),
  gameModes: z.union([z.boolean(),z.lazy(() => GameModeFindManyArgsSchema)]).optional(),
  levelResult: z.union([z.boolean(),z.lazy(() => LevelResultArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LevelCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FRAGMENT
//------------------------------------------------------

export const FragmentIncludeSchema: z.ZodType<Prisma.FragmentInclude> = z.object({
  notes: z.union([z.boolean(),z.lazy(() => NoteFindManyArgsSchema)]).optional(),
  level: z.union([z.boolean(),z.lazy(() => LevelFindManyArgsSchema)]).optional(),
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
  notes: z.boolean().optional(),
  level: z.boolean().optional(),
}).strict();

export const FragmentSelectSchema: z.ZodType<Prisma.FragmentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  notes: z.union([z.boolean(),z.lazy(() => NoteFindManyArgsSchema)]).optional(),
  level: z.union([z.boolean(),z.lazy(() => LevelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FragmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NOTE
//------------------------------------------------------

export const NoteIncludeSchema: z.ZodType<Prisma.NoteInclude> = z.object({
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
}).strict()

export const NoteArgsSchema: z.ZodType<Prisma.NoteArgs> = z.object({
  select: z.lazy(() => NoteSelectSchema).optional(),
  include: z.lazy(() => NoteIncludeSchema).optional(),
}).strict();

export const NoteSelectSchema: z.ZodType<Prisma.NoteSelect> = z.object({
  id: z.boolean().optional(),
  id_Fragment: z.boolean().optional(),
  name: z.boolean().optional(),
  time: z.boolean().optional(),
  duration: z.boolean().optional(),
  speed: z.boolean().optional(),
  fragment: z.union([z.boolean(),z.lazy(() => FragmentArgsSchema)]).optional(),
}).strict()

// GAME MODE
//------------------------------------------------------

export const GameModeIncludeSchema: z.ZodType<Prisma.GameModeInclude> = z.object({
  levels: z.union([z.boolean(),z.lazy(() => LevelFindManyArgsSchema)]).optional(),
  levelResult: z.union([z.boolean(),z.lazy(() => LevelResultArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GameModeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GameModeArgsSchema: z.ZodType<Prisma.GameModeArgs> = z.object({
  select: z.lazy(() => GameModeSelectSchema).optional(),
  include: z.lazy(() => GameModeIncludeSchema).optional(),
}).strict();

export const GameModeCountOutputTypeArgsSchema: z.ZodType<Prisma.GameModeCountOutputTypeArgs> = z.object({
  select: z.lazy(() => GameModeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GameModeCountOutputTypeSelectSchema: z.ZodType<Prisma.GameModeCountOutputTypeSelect> = z.object({
  levels: z.boolean().optional(),
}).strict();

export const GameModeSelectSchema: z.ZodType<Prisma.GameModeSelect> = z.object({
  id: z.boolean().optional(),
  id_levelResult: z.boolean().optional(),
  name: z.boolean().optional(),
  levels: z.union([z.boolean(),z.lazy(() => LevelFindManyArgsSchema)]).optional(),
  levelResult: z.union([z.boolean(),z.lazy(() => LevelResultArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GameModeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LEVEL RESULT
//------------------------------------------------------

export const LevelResultIncludeSchema: z.ZodType<Prisma.LevelResultInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  gameModes: z.union([z.boolean(),z.lazy(() => GameModeFindManyArgsSchema)]).optional(),
  levels: z.union([z.boolean(),z.lazy(() => LevelFindManyArgsSchema)]).optional(),
  levelResultFragmentAnswers: z.union([z.boolean(),z.lazy(() => LevelResultFragmentAnswerFindManyArgsSchema)]).optional(),
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
  gameModes: z.boolean().optional(),
  levels: z.boolean().optional(),
  levelResultFragmentAnswers: z.boolean().optional(),
}).strict();

export const LevelResultSelectSchema: z.ZodType<Prisma.LevelResultSelect> = z.object({
  id: z.boolean().optional(),
  id_User: z.boolean().optional(),
  playDate: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  timesListenedAgain: z.boolean().optional(),
  transposed: z.boolean().optional(),
  reactionTime: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  gameModes: z.union([z.boolean(),z.lazy(() => GameModeFindManyArgsSchema)]).optional(),
  levels: z.union([z.boolean(),z.lazy(() => LevelFindManyArgsSchema)]).optional(),
  levelResultFragmentAnswers: z.union([z.boolean(),z.lazy(() => LevelResultFragmentAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LevelResultCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LEVEL RESULT FRAGMENT ANSWER
//------------------------------------------------------

export const LevelResultFragmentAnswerIncludeSchema: z.ZodType<Prisma.LevelResultFragmentAnswerInclude> = z.object({
  levelResult: z.union([z.boolean(),z.lazy(() => LevelResultArgsSchema)]).optional(),
}).strict()

export const LevelResultFragmentAnswerArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerArgs> = z.object({
  select: z.lazy(() => LevelResultFragmentAnswerSelectSchema).optional(),
  include: z.lazy(() => LevelResultFragmentAnswerIncludeSchema).optional(),
}).strict();

export const LevelResultFragmentAnswerSelectSchema: z.ZodType<Prisma.LevelResultFragmentAnswerSelect> = z.object({
  id: z.boolean().optional(),
  id_LevelResult: z.boolean().optional(),
  answeredCorrectly: z.boolean().optional(),
  levelResult: z.union([z.boolean(),z.lazy(() => LevelResultArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

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

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_restGehoor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  id_TypeCI: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  id_Role: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  id_Team: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  hadTraining: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  experience: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  processor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  restGehoor: z.union([ z.lazy(() => RestGehoorRelationFilterSchema),z.lazy(() => RestGehoorWhereInputSchema) ]).optional().nullable(),
  typeCI: z.union([ z.lazy(() => TypeCIRelationFilterSchema),z.lazy(() => TypeCIWhereInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional().nullable(),
  team: z.union([ z.lazy(() => TeamRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  levelResults: z.lazy(() => LevelResultListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  id_restGehoor: z.lazy(() => SortOrderSchema).optional(),
  id_TypeCI: z.lazy(() => SortOrderSchema).optional(),
  id_Role: z.lazy(() => SortOrderSchema).optional(),
  id_Team: z.lazy(() => SortOrderSchema).optional(),
  hadTraining: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional(),
  processor: z.lazy(() => SortOrderSchema).optional(),
  entreeVragenLijst: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorOrderByWithRelationInputSchema).optional(),
  typeCI: z.lazy(() => TypeCIOrderByWithRelationInputSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional(),
  team: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultOrderByRelationAggregateInputSchema).optional()
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
  id_restGehoor: z.lazy(() => SortOrderSchema).optional(),
  id_TypeCI: z.lazy(() => SortOrderSchema).optional(),
  id_Role: z.lazy(() => SortOrderSchema).optional(),
  id_Team: z.lazy(() => SortOrderSchema).optional(),
  hadTraining: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional(),
  processor: z.lazy(() => SortOrderSchema).optional(),
  entreeVragenLijst: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
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
  id_restGehoor: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  id_TypeCI: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  id_Role: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  id_Team: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  hadTraining: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  experience: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  processor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RestGehoorWhereInputSchema: z.ZodType<Prisma.RestGehoorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RestGehoorWhereInputSchema),z.lazy(() => RestGehoorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RestGehoorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RestGehoorWhereInputSchema),z.lazy(() => RestGehoorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  restGehoor: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const RestGehoorOrderByWithRelationInputSchema: z.ZodType<Prisma.RestGehoorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  restGehoor: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RestGehoorWhereUniqueInputSchema: z.ZodType<Prisma.RestGehoorWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const RestGehoorOrderByWithAggregationInputSchema: z.ZodType<Prisma.RestGehoorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  restGehoor: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RestGehoorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RestGehoorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RestGehoorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RestGehoorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RestGehoorSumOrderByAggregateInputSchema).optional()
}).strict();

export const RestGehoorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RestGehoorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RestGehoorScalarWhereWithAggregatesInputSchema),z.lazy(() => RestGehoorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RestGehoorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RestGehoorScalarWhereWithAggregatesInputSchema),z.lazy(() => RestGehoorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  restGehoor: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TypeCIWhereInputSchema: z.ZodType<Prisma.TypeCIWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TypeCIWhereInputSchema),z.lazy(() => TypeCIWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TypeCIWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TypeCIWhereInputSchema),z.lazy(() => TypeCIWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ciName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  merk: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const TypeCIOrderByWithRelationInputSchema: z.ZodType<Prisma.TypeCIOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ciName: z.lazy(() => SortOrderSchema).optional(),
  merk: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TypeCIWhereUniqueInputSchema: z.ZodType<Prisma.TypeCIWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  ciName: z.string().optional()
}).strict();

export const TypeCIOrderByWithAggregationInputSchema: z.ZodType<Prisma.TypeCIOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ciName: z.lazy(() => SortOrderSchema).optional(),
  merk: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TypeCICountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TypeCIAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TypeCIMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TypeCIMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TypeCISumOrderByAggregateInputSchema).optional()
}).strict();

export const TypeCIScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TypeCIScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TypeCIScalarWhereWithAggregatesInputSchema),z.lazy(() => TypeCIScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TypeCIScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TypeCIScalarWhereWithAggregatesInputSchema),z.lazy(() => TypeCIScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ciName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  merk: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RoleWhereInputSchema: z.ZodType<Prisma.RoleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const RoleOrderByWithRelationInputSchema: z.ZodType<Prisma.RoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RoleWhereUniqueInputSchema: z.ZodType<Prisma.RoleWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional()
}).strict();

export const RoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RoleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RoleSumOrderByAggregateInputSchema).optional()
}).strict();

export const RoleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const KliniekWhereInputSchema: z.ZodType<Prisma.KliniekWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KliniekWhereInputSchema),z.lazy(() => KliniekWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KliniekWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KliniekWhereInputSchema),z.lazy(() => KliniekWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team: z.lazy(() => TeamListRelationFilterSchema).optional()
}).strict();

export const KliniekOrderByWithRelationInputSchema: z.ZodType<Prisma.KliniekOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  team: z.lazy(() => TeamOrderByRelationAggregateInputSchema).optional()
}).strict();

export const KliniekWhereUniqueInputSchema: z.ZodType<Prisma.KliniekWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional()
}).strict();

export const KliniekOrderByWithAggregationInputSchema: z.ZodType<Prisma.KliniekOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KliniekCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => KliniekAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KliniekMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KliniekMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => KliniekSumOrderByAggregateInputSchema).optional()
}).strict();

export const KliniekScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KliniekScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KliniekScalarWhereWithAggregatesInputSchema),z.lazy(() => KliniekScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KliniekScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KliniekScalarWhereWithAggregatesInputSchema),z.lazy(() => KliniekScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TeamWhereInputSchema: z.ZodType<Prisma.TeamWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_Kliniek: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  kliniek: z.union([ z.lazy(() => KliniekRelationFilterSchema),z.lazy(() => KliniekWhereInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  game: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict();

export const TeamOrderByWithRelationInputSchema: z.ZodType<Prisma.TeamOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Kliniek: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  kliniek: z.lazy(() => KliniekOrderByWithRelationInputSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  game: z.lazy(() => GameOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TeamWhereUniqueInputSchema: z.ZodType<Prisma.TeamWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const TeamOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeamOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Kliniek: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TeamCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TeamAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TeamMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TeamMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TeamSumOrderByAggregateInputSchema).optional()
}).strict();

export const TeamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeamScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  id_Kliniek: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const GameWhereInputSchema: z.ZodType<Prisma.GameWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GameWhereInputSchema),z.lazy(() => GameWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameWhereInputSchema),z.lazy(() => GameWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teams: z.lazy(() => TeamListRelationFilterSchema).optional(),
  levels: z.lazy(() => LevelListRelationFilterSchema).optional()
}).strict();

export const GameOrderByWithRelationInputSchema: z.ZodType<Prisma.GameOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  teams: z.lazy(() => TeamOrderByRelationAggregateInputSchema).optional(),
  levels: z.lazy(() => LevelOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GameWhereUniqueInputSchema: z.ZodType<Prisma.GameWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const GameOrderByWithAggregationInputSchema: z.ZodType<Prisma.GameOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GameCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GameAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GameMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GameMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GameSumOrderByAggregateInputSchema).optional()
}).strict();

export const GameScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GameScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GameScalarWhereWithAggregatesInputSchema),z.lazy(() => GameScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameScalarWhereWithAggregatesInputSchema),z.lazy(() => GameScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LevelWhereInputSchema: z.ZodType<Prisma.LevelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelWhereInputSchema),z.lazy(() => LevelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelWhereInputSchema),z.lazy(() => LevelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_Game: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  id_levelResult: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  BPM: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  correctAnswers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cooldownTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  fragmentToShow: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  game: z.union([ z.lazy(() => GameRelationFilterSchema),z.lazy(() => GameWhereInputSchema) ]).optional().nullable(),
  fragments: z.lazy(() => FragmentListRelationFilterSchema).optional(),
  gameModes: z.lazy(() => GameModeListRelationFilterSchema).optional(),
  levelResult: z.union([ z.lazy(() => LevelResultRelationFilterSchema),z.lazy(() => LevelResultWhereInputSchema) ]).optional().nullable(),
}).strict();

export const LevelOrderByWithRelationInputSchema: z.ZodType<Prisma.LevelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Game: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  BPM: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  fragmentToShow: z.lazy(() => SortOrderSchema).optional(),
  game: z.lazy(() => GameOrderByWithRelationInputSchema).optional(),
  fragments: z.lazy(() => FragmentOrderByRelationAggregateInputSchema).optional(),
  gameModes: z.lazy(() => GameModeOrderByRelationAggregateInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultOrderByWithRelationInputSchema).optional()
}).strict();

export const LevelWhereUniqueInputSchema: z.ZodType<Prisma.LevelWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const LevelOrderByWithAggregationInputSchema: z.ZodType<Prisma.LevelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Game: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  BPM: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  fragmentToShow: z.lazy(() => SortOrderSchema).optional(),
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
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  id_Game: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  id_levelResult: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  BPM: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  correctAnswers: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cooldownTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  fragmentToShow: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const FragmentWhereInputSchema: z.ZodType<Prisma.FragmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FragmentWhereInputSchema),z.lazy(() => FragmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FragmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FragmentWhereInputSchema),z.lazy(() => FragmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.lazy(() => NoteListRelationFilterSchema).optional(),
  level: z.lazy(() => LevelListRelationFilterSchema).optional()
}).strict();

export const FragmentOrderByWithRelationInputSchema: z.ZodType<Prisma.FragmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => NoteOrderByRelationAggregateInputSchema).optional(),
  level: z.lazy(() => LevelOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FragmentWhereUniqueInputSchema: z.ZodType<Prisma.FragmentWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const FragmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.FragmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FragmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FragmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FragmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FragmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FragmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const FragmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FragmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema),z.lazy(() => FragmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const NoteWhereInputSchema: z.ZodType<Prisma.NoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_Fragment: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  time: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  speed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fragment: z.union([ z.lazy(() => FragmentRelationFilterSchema),z.lazy(() => FragmentWhereInputSchema) ]).optional(),
}).strict();

export const NoteOrderByWithRelationInputSchema: z.ZodType<Prisma.NoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Fragment: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
  fragment: z.lazy(() => FragmentOrderByWithRelationInputSchema).optional()
}).strict();

export const NoteWhereUniqueInputSchema: z.ZodType<Prisma.NoteWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const NoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.NoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Fragment: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
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
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  id_Fragment: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  time: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  duration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  speed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const GameModeWhereInputSchema: z.ZodType<Prisma.GameModeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GameModeWhereInputSchema),z.lazy(() => GameModeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameModeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameModeWhereInputSchema),z.lazy(() => GameModeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_levelResult: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  levels: z.lazy(() => LevelListRelationFilterSchema).optional(),
  levelResult: z.union([ z.lazy(() => LevelResultRelationFilterSchema),z.lazy(() => LevelResultWhereInputSchema) ]).optional().nullable(),
}).strict();

export const GameModeOrderByWithRelationInputSchema: z.ZodType<Prisma.GameModeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  levels: z.lazy(() => LevelOrderByRelationAggregateInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultOrderByWithRelationInputSchema).optional()
}).strict();

export const GameModeWhereUniqueInputSchema: z.ZodType<Prisma.GameModeWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const GameModeOrderByWithAggregationInputSchema: z.ZodType<Prisma.GameModeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GameModeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GameModeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GameModeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GameModeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GameModeSumOrderByAggregateInputSchema).optional()
}).strict();

export const GameModeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GameModeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GameModeScalarWhereWithAggregatesInputSchema),z.lazy(() => GameModeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameModeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameModeScalarWhereWithAggregatesInputSchema),z.lazy(() => GameModeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  id_levelResult: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LevelResultWhereInputSchema: z.ZodType<Prisma.LevelResultWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultWhereInputSchema),z.lazy(() => LevelResultWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultWhereInputSchema),z.lazy(() => LevelResultWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_User: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  playDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  timesListenedAgain: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  transposed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reactionTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  gameModes: z.lazy(() => GameModeListRelationFilterSchema).optional(),
  levels: z.lazy(() => LevelListRelationFilterSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerListRelationFilterSchema).optional()
}).strict();

export const LevelResultOrderByWithRelationInputSchema: z.ZodType<Prisma.LevelResultOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_User: z.lazy(() => SortOrderSchema).optional(),
  playDate: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  timesListenedAgain: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  reactionTime: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  gameModes: z.lazy(() => GameModeOrderByRelationAggregateInputSchema).optional(),
  levels: z.lazy(() => LevelOrderByRelationAggregateInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LevelResultWhereUniqueInputSchema: z.ZodType<Prisma.LevelResultWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const LevelResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.LevelResultOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_User: z.lazy(() => SortOrderSchema).optional(),
  playDate: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  timesListenedAgain: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  reactionTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LevelResultCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LevelResultAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LevelResultMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LevelResultMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LevelResultSumOrderByAggregateInputSchema).optional()
}).strict();

export const LevelResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LevelResultScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelResultScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  id_User: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  playDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  timesListenedAgain: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  transposed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reactionTime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const LevelResultFragmentAnswerWhereInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultFragmentAnswerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_LevelResult: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  answeredCorrectly: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  levelResult: z.union([ z.lazy(() => LevelResultRelationFilterSchema),z.lazy(() => LevelResultWhereInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentAnswerOrderByWithRelationInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_LevelResult: z.lazy(() => SortOrderSchema).optional(),
  answeredCorrectly: z.lazy(() => SortOrderSchema).optional(),
  levelResult: z.lazy(() => LevelResultOrderByWithRelationInputSchema).optional()
}).strict();

export const LevelResultFragmentAnswerWhereUniqueInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const LevelResultFragmentAnswerOrderByWithAggregationInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_LevelResult: z.lazy(() => SortOrderSchema).optional(),
  answeredCorrectly: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LevelResultFragmentAnswerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LevelResultFragmentAnswerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LevelResultFragmentAnswerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LevelResultFragmentAnswerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LevelResultFragmentAnswerSumOrderByAggregateInputSchema).optional()
}).strict();

export const LevelResultFragmentAnswerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultFragmentAnswerScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelResultFragmentAnswerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultFragmentAnswerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultFragmentAnswerScalarWhereWithAggregatesInputSchema),z.lazy(() => LevelResultFragmentAnswerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  id_LevelResult: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  answeredCorrectly: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
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

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().int().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorCreateNestedOneWithoutUserInputSchema).optional(),
  typeCI: z.lazy(() => TypeCICreateNestedOneWithoutUserInputSchema).optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutUsersInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  id_restGehoor: z.number().int().optional().nullable(),
  id_TypeCI: z.number().int().optional().nullable(),
  id_Role: z.number().int().optional().nullable(),
  id_Team: z.number().int().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().int().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorUpdateOneWithoutUserNestedInputSchema).optional(),
  typeCI: z.lazy(() => TypeCIUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneWithoutUsersNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateOneWithoutUsersNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RestGehoorCreateInputSchema: z.ZodType<Prisma.RestGehoorCreateInput> = z.object({
  created_at: z.coerce.date().optional(),
  restGehoor: z.number().int(),
  user: z.lazy(() => UserCreateNestedManyWithoutRestGehoorInputSchema).optional()
}).strict();

export const RestGehoorUncheckedCreateInputSchema: z.ZodType<Prisma.RestGehoorUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  restGehoor: z.number().int(),
  user: z.lazy(() => UserUncheckedCreateNestedManyWithoutRestGehoorInputSchema).optional()
}).strict();

export const RestGehoorUpdateInputSchema: z.ZodType<Prisma.RestGehoorUpdateInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  restGehoor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateManyWithoutRestGehoorNestedInputSchema).optional()
}).strict();

export const RestGehoorUncheckedUpdateInputSchema: z.ZodType<Prisma.RestGehoorUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  restGehoor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUncheckedUpdateManyWithoutRestGehoorNestedInputSchema).optional()
}).strict();

export const RestGehoorUpdateManyMutationInputSchema: z.ZodType<Prisma.RestGehoorUpdateManyMutationInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  restGehoor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RestGehoorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RestGehoorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  restGehoor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypeCICreateInputSchema: z.ZodType<Prisma.TypeCICreateInput> = z.object({
  ciName: z.string(),
  merk: z.string(),
  user: z.lazy(() => UserCreateNestedManyWithoutTypeCIInputSchema).optional()
}).strict();

export const TypeCIUncheckedCreateInputSchema: z.ZodType<Prisma.TypeCIUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  ciName: z.string(),
  merk: z.string(),
  user: z.lazy(() => UserUncheckedCreateNestedManyWithoutTypeCIInputSchema).optional()
}).strict();

export const TypeCIUpdateInputSchema: z.ZodType<Prisma.TypeCIUpdateInput> = z.object({
  ciName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  merk: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateManyWithoutTypeCINestedInputSchema).optional()
}).strict();

export const TypeCIUncheckedUpdateInputSchema: z.ZodType<Prisma.TypeCIUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ciName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  merk: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUncheckedUpdateManyWithoutTypeCINestedInputSchema).optional()
}).strict();

export const TypeCIUpdateManyMutationInputSchema: z.ZodType<Prisma.TypeCIUpdateManyMutationInput> = z.object({
  ciName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  merk: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypeCIUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TypeCIUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ciName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  merk: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleCreateInputSchema: z.ZodType<Prisma.RoleCreateInput> = z.object({
  name: z.string(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateInputSchema: z.ZodType<Prisma.RoleUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUpdateInputSchema: z.ZodType<Prisma.RoleUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUpdateManyMutationInputSchema: z.ZodType<Prisma.RoleUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KliniekCreateInputSchema: z.ZodType<Prisma.KliniekCreateInput> = z.object({
  name: z.string(),
  team: z.lazy(() => TeamCreateNestedManyWithoutKliniekInputSchema).optional()
}).strict();

export const KliniekUncheckedCreateInputSchema: z.ZodType<Prisma.KliniekUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  team: z.lazy(() => TeamUncheckedCreateNestedManyWithoutKliniekInputSchema).optional()
}).strict();

export const KliniekUpdateInputSchema: z.ZodType<Prisma.KliniekUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUpdateManyWithoutKliniekNestedInputSchema).optional()
}).strict();

export const KliniekUncheckedUpdateInputSchema: z.ZodType<Prisma.KliniekUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUncheckedUpdateManyWithoutKliniekNestedInputSchema).optional()
}).strict();

export const KliniekUpdateManyMutationInputSchema: z.ZodType<Prisma.KliniekUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KliniekUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KliniekUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamCreateInputSchema: z.ZodType<Prisma.TeamCreateInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  kliniek: z.lazy(() => KliniekCreateNestedOneWithoutTeamInputSchema).optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutTeamInputSchema).optional(),
  game: z.lazy(() => GameCreateNestedManyWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateInputSchema: z.ZodType<Prisma.TeamUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  id_Kliniek: z.number().int().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  game: z.lazy(() => GameUncheckedCreateNestedManyWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUpdateInputSchema: z.ZodType<Prisma.TeamUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kliniek: z.lazy(() => KliniekUpdateOneWithoutTeamNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutTeamNestedInputSchema).optional(),
  game: z.lazy(() => GameUpdateManyWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Kliniek: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  game: z.lazy(() => GameUncheckedUpdateManyWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUpdateManyMutationInputSchema: z.ZodType<Prisma.TeamUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TeamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Kliniek: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GameCreateInputSchema: z.ZodType<Prisma.GameCreateInput> = z.object({
  name: z.string(),
  teams: z.lazy(() => TeamCreateNestedManyWithoutGameInputSchema).optional(),
  levels: z.lazy(() => LevelCreateNestedManyWithoutGameInputSchema).optional()
}).strict();

export const GameUncheckedCreateInputSchema: z.ZodType<Prisma.GameUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  teams: z.lazy(() => TeamUncheckedCreateNestedManyWithoutGameInputSchema).optional(),
  levels: z.lazy(() => LevelUncheckedCreateNestedManyWithoutGameInputSchema).optional()
}).strict();

export const GameUpdateInputSchema: z.ZodType<Prisma.GameUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUpdateManyWithoutGameNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUpdateManyWithoutGameNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateInputSchema: z.ZodType<Prisma.GameUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUncheckedUpdateManyWithoutGameNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUncheckedUpdateManyWithoutGameNestedInputSchema).optional()
}).strict();

export const GameUpdateManyMutationInputSchema: z.ZodType<Prisma.GameUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelCreateInputSchema: z.ZodType<Prisma.LevelCreateInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number().int(),
  correctAnswers: z.number().int(),
  cooldownTime: z.number().int().optional().nullable(),
  fragmentToShow: z.number().int(),
  game: z.lazy(() => GameCreateNestedOneWithoutLevelsInputSchema).optional(),
  fragments: z.lazy(() => FragmentCreateNestedManyWithoutLevelInputSchema).optional(),
  gameModes: z.lazy(() => GameModeCreateNestedManyWithoutLevelsInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutLevelsInputSchema).optional()
}).strict();

export const LevelUncheckedCreateInputSchema: z.ZodType<Prisma.LevelUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  id_Game: z.number().int().optional().nullable(),
  id_levelResult: z.number().int().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number().int(),
  correctAnswers: z.number().int(),
  cooldownTime: z.number().int().optional().nullable(),
  fragmentToShow: z.number().int(),
  fragments: z.lazy(() => FragmentUncheckedCreateNestedManyWithoutLevelInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUncheckedCreateNestedManyWithoutLevelsInputSchema).optional()
}).strict();

export const LevelUpdateInputSchema: z.ZodType<Prisma.LevelUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  game: z.lazy(() => GameUpdateOneWithoutLevelsNestedInputSchema).optional(),
  fragments: z.lazy(() => FragmentUpdateManyWithoutLevelNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUpdateManyWithoutLevelsNestedInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultUpdateOneWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelUncheckedUpdateInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Game: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_levelResult: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => FragmentUncheckedUpdateManyWithoutLevelNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUncheckedUpdateManyWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelUpdateManyMutationInputSchema: z.ZodType<Prisma.LevelUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Game: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_levelResult: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FragmentCreateInputSchema: z.ZodType<Prisma.FragmentCreateInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.lazy(() => NoteCreateNestedManyWithoutFragmentInputSchema).optional(),
  level: z.lazy(() => LevelCreateNestedManyWithoutFragmentsInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.lazy(() => NoteUncheckedCreateNestedManyWithoutFragmentInputSchema).optional(),
  level: z.lazy(() => LevelUncheckedCreateNestedManyWithoutFragmentsInputSchema).optional()
}).strict();

export const FragmentUpdateInputSchema: z.ZodType<Prisma.FragmentUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.lazy(() => NoteUpdateManyWithoutFragmentNestedInputSchema).optional(),
  level: z.lazy(() => LevelUpdateManyWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.lazy(() => NoteUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional(),
  level: z.lazy(() => LevelUncheckedUpdateManyWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const FragmentUpdateManyMutationInputSchema: z.ZodType<Prisma.FragmentUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FragmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NoteCreateInputSchema: z.ZodType<Prisma.NoteCreateInput> = z.object({
  name: z.string(),
  time: z.number().int(),
  duration: z.number().int(),
  speed: z.number().int(),
  fragment: z.lazy(() => FragmentCreateNestedOneWithoutNotesInputSchema)
}).strict();

export const NoteUncheckedCreateInputSchema: z.ZodType<Prisma.NoteUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  id_Fragment: z.number().int(),
  name: z.string(),
  time: z.number().int(),
  duration: z.number().int(),
  speed: z.number().int()
}).strict();

export const NoteUpdateInputSchema: z.ZodType<Prisma.NoteUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragment: z.lazy(() => FragmentUpdateOneRequiredWithoutNotesNestedInputSchema).optional()
}).strict();

export const NoteUncheckedUpdateInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Fragment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUpdateManyMutationInputSchema: z.ZodType<Prisma.NoteUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Fragment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameModeCreateInputSchema: z.ZodType<Prisma.GameModeCreateInput> = z.object({
  name: z.string(),
  levels: z.lazy(() => LevelCreateNestedManyWithoutGameModesInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutGameModesInputSchema).optional()
}).strict();

export const GameModeUncheckedCreateInputSchema: z.ZodType<Prisma.GameModeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  id_levelResult: z.number().int().optional().nullable(),
  name: z.string(),
  levels: z.lazy(() => LevelUncheckedCreateNestedManyWithoutGameModesInputSchema).optional()
}).strict();

export const GameModeUpdateInputSchema: z.ZodType<Prisma.GameModeUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelUpdateManyWithoutGameModesNestedInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultUpdateOneWithoutGameModesNestedInputSchema).optional()
}).strict();

export const GameModeUncheckedUpdateInputSchema: z.ZodType<Prisma.GameModeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_levelResult: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelUncheckedUpdateManyWithoutGameModesNestedInputSchema).optional()
}).strict();

export const GameModeUpdateManyMutationInputSchema: z.ZodType<Prisma.GameModeUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameModeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GameModeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_levelResult: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultCreateInputSchema: z.ZodType<Prisma.LevelResultCreateInput> = z.object({
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number().int(),
  transposed: z.number().int(),
  reactionTime: z.number().int(),
  user: z.lazy(() => UserCreateNestedOneWithoutLevelResultsInputSchema),
  gameModes: z.lazy(() => GameModeCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levels: z.lazy(() => LevelCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUncheckedCreateInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  id_User: z.string(),
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number().int(),
  transposed: z.number().int(),
  reactionTime: z.number().int(),
  gameModes: z.lazy(() => GameModeUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levels: z.lazy(() => LevelUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUpdateInputSchema: z.ZodType<Prisma.LevelResultUpdateInput> = z.object({
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLevelResultsNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_User: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gameModes: z.lazy(() => GameModeUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUpdateManyMutationInputSchema: z.ZodType<Prisma.LevelResultUpdateManyMutationInput> = z.object({
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_User: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentAnswerCreateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerCreateInput> = z.object({
  answeredCorrectly: z.boolean(),
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutLevelResultFragmentAnswersInputSchema)
}).strict();

export const LevelResultFragmentAnswerUncheckedCreateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  id_LevelResult: z.number().int(),
  answeredCorrectly: z.boolean()
}).strict();

export const LevelResultFragmentAnswerUpdateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpdateInput> = z.object({
  answeredCorrectly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  levelResult: z.lazy(() => LevelResultUpdateOneRequiredWithoutLevelResultFragmentAnswersNestedInputSchema).optional()
}).strict();

export const LevelResultFragmentAnswerUncheckedUpdateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_LevelResult: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  answeredCorrectly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentAnswerUpdateManyMutationInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpdateManyMutationInput> = z.object({
  answeredCorrectly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentAnswerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_LevelResult: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  answeredCorrectly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const RestGehoorRelationFilterSchema: z.ZodType<Prisma.RestGehoorRelationFilter> = z.object({
  is: z.lazy(() => RestGehoorWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RestGehoorWhereInputSchema).optional().nullable()
}).strict();

export const TypeCIRelationFilterSchema: z.ZodType<Prisma.TypeCIRelationFilter> = z.object({
  is: z.lazy(() => TypeCIWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TypeCIWhereInputSchema).optional().nullable()
}).strict();

export const RoleRelationFilterSchema: z.ZodType<Prisma.RoleRelationFilter> = z.object({
  is: z.lazy(() => RoleWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RoleWhereInputSchema).optional().nullable()
}).strict();

export const TeamRelationFilterSchema: z.ZodType<Prisma.TeamRelationFilter> = z.object({
  is: z.lazy(() => TeamWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TeamWhereInputSchema).optional().nullable()
}).strict();

export const LevelResultListRelationFilterSchema: z.ZodType<Prisma.LevelResultListRelationFilter> = z.object({
  every: z.lazy(() => LevelResultWhereInputSchema).optional(),
  some: z.lazy(() => LevelResultWhereInputSchema).optional(),
  none: z.lazy(() => LevelResultWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LevelResultOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  id_restGehoor: z.lazy(() => SortOrderSchema).optional(),
  id_TypeCI: z.lazy(() => SortOrderSchema).optional(),
  id_Role: z.lazy(() => SortOrderSchema).optional(),
  id_Team: z.lazy(() => SortOrderSchema).optional(),
  hadTraining: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional(),
  processor: z.lazy(() => SortOrderSchema).optional(),
  entreeVragenLijst: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id_restGehoor: z.lazy(() => SortOrderSchema).optional(),
  id_TypeCI: z.lazy(() => SortOrderSchema).optional(),
  id_Role: z.lazy(() => SortOrderSchema).optional(),
  id_Team: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  id_restGehoor: z.lazy(() => SortOrderSchema).optional(),
  id_TypeCI: z.lazy(() => SortOrderSchema).optional(),
  id_Role: z.lazy(() => SortOrderSchema).optional(),
  id_Team: z.lazy(() => SortOrderSchema).optional(),
  hadTraining: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional(),
  processor: z.lazy(() => SortOrderSchema).optional(),
  entreeVragenLijst: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  id_restGehoor: z.lazy(() => SortOrderSchema).optional(),
  id_TypeCI: z.lazy(() => SortOrderSchema).optional(),
  id_Role: z.lazy(() => SortOrderSchema).optional(),
  id_Team: z.lazy(() => SortOrderSchema).optional(),
  hadTraining: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional(),
  processor: z.lazy(() => SortOrderSchema).optional(),
  entreeVragenLijst: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id_restGehoor: z.lazy(() => SortOrderSchema).optional(),
  id_TypeCI: z.lazy(() => SortOrderSchema).optional(),
  id_Role: z.lazy(() => SortOrderSchema).optional(),
  id_Team: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional()
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

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
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

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RestGehoorCountOrderByAggregateInputSchema: z.ZodType<Prisma.RestGehoorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  restGehoor: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RestGehoorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RestGehoorAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  restGehoor: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RestGehoorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RestGehoorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  restGehoor: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RestGehoorMinOrderByAggregateInputSchema: z.ZodType<Prisma.RestGehoorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  restGehoor: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RestGehoorSumOrderByAggregateInputSchema: z.ZodType<Prisma.RestGehoorSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  restGehoor: z.lazy(() => SortOrderSchema).optional()
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

export const TypeCICountOrderByAggregateInputSchema: z.ZodType<Prisma.TypeCICountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ciName: z.lazy(() => SortOrderSchema).optional(),
  merk: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TypeCIAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TypeCIAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TypeCIMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TypeCIMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ciName: z.lazy(() => SortOrderSchema).optional(),
  merk: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TypeCIMinOrderByAggregateInputSchema: z.ZodType<Prisma.TypeCIMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ciName: z.lazy(() => SortOrderSchema).optional(),
  merk: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TypeCISumOrderByAggregateInputSchema: z.ZodType<Prisma.TypeCISumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RoleAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleSumOrderByAggregateInputSchema: z.ZodType<Prisma.RoleSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamListRelationFilterSchema: z.ZodType<Prisma.TeamListRelationFilter> = z.object({
  every: z.lazy(() => TeamWhereInputSchema).optional(),
  some: z.lazy(() => TeamWhereInputSchema).optional(),
  none: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TeamOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KliniekCountOrderByAggregateInputSchema: z.ZodType<Prisma.KliniekCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KliniekAvgOrderByAggregateInputSchema: z.ZodType<Prisma.KliniekAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KliniekMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KliniekMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KliniekMinOrderByAggregateInputSchema: z.ZodType<Prisma.KliniekMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KliniekSumOrderByAggregateInputSchema: z.ZodType<Prisma.KliniekSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KliniekRelationFilterSchema: z.ZodType<Prisma.KliniekRelationFilter> = z.object({
  is: z.lazy(() => KliniekWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => KliniekWhereInputSchema).optional().nullable()
}).strict();

export const GameListRelationFilterSchema: z.ZodType<Prisma.GameListRelationFilter> = z.object({
  every: z.lazy(() => GameWhereInputSchema).optional(),
  some: z.lazy(() => GameWhereInputSchema).optional(),
  none: z.lazy(() => GameWhereInputSchema).optional()
}).strict();

export const GameOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GameOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeamCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Kliniek: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TeamAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Kliniek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Kliniek: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Kliniek: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamSumOrderByAggregateInputSchema: z.ZodType<Prisma.TeamSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Kliniek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelListRelationFilterSchema: z.ZodType<Prisma.LevelListRelationFilter> = z.object({
  every: z.lazy(() => LevelWhereInputSchema).optional(),
  some: z.lazy(() => LevelWhereInputSchema).optional(),
  none: z.lazy(() => LevelWhereInputSchema).optional()
}).strict();

export const LevelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LevelOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameCountOrderByAggregateInputSchema: z.ZodType<Prisma.GameCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GameAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GameMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameMinOrderByAggregateInputSchema: z.ZodType<Prisma.GameMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameSumOrderByAggregateInputSchema: z.ZodType<Prisma.GameSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameRelationFilterSchema: z.ZodType<Prisma.GameRelationFilter> = z.object({
  is: z.lazy(() => GameWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => GameWhereInputSchema).optional().nullable()
}).strict();

export const FragmentListRelationFilterSchema: z.ZodType<Prisma.FragmentListRelationFilter> = z.object({
  every: z.lazy(() => FragmentWhereInputSchema).optional(),
  some: z.lazy(() => FragmentWhereInputSchema).optional(),
  none: z.lazy(() => FragmentWhereInputSchema).optional()
}).strict();

export const GameModeListRelationFilterSchema: z.ZodType<Prisma.GameModeListRelationFilter> = z.object({
  every: z.lazy(() => GameModeWhereInputSchema).optional(),
  some: z.lazy(() => GameModeWhereInputSchema).optional(),
  none: z.lazy(() => GameModeWhereInputSchema).optional()
}).strict();

export const LevelResultRelationFilterSchema: z.ZodType<Prisma.LevelResultRelationFilter> = z.object({
  is: z.lazy(() => LevelResultWhereInputSchema).optional(),
  isNot: z.lazy(() => LevelResultWhereInputSchema).optional()
}).strict();

export const FragmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FragmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameModeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GameModeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelCountOrderByAggregateInputSchema: z.ZodType<Prisma.LevelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Game: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  BPM: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  fragmentToShow: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LevelAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Game: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  BPM: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  fragmentToShow: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LevelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Game: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  BPM: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  fragmentToShow: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelMinOrderByAggregateInputSchema: z.ZodType<Prisma.LevelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Game: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  BPM: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  fragmentToShow: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelSumOrderByAggregateInputSchema: z.ZodType<Prisma.LevelSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Game: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  BPM: z.lazy(() => SortOrderSchema).optional(),
  correctAnswers: z.lazy(() => SortOrderSchema).optional(),
  cooldownTime: z.lazy(() => SortOrderSchema).optional(),
  fragmentToShow: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteListRelationFilterSchema: z.ZodType<Prisma.NoteListRelationFilter> = z.object({
  every: z.lazy(() => NoteWhereInputSchema).optional(),
  some: z.lazy(() => NoteWhereInputSchema).optional(),
  none: z.lazy(() => NoteWhereInputSchema).optional()
}).strict();

export const NoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FragmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.FragmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FragmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FragmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
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

export const FragmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.FragmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FragmentRelationFilterSchema: z.ZodType<Prisma.FragmentRelationFilter> = z.object({
  is: z.lazy(() => FragmentWhereInputSchema).optional(),
  isNot: z.lazy(() => FragmentWhereInputSchema).optional()
}).strict();

export const NoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.NoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Fragment: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NoteAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Fragment: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Fragment: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Fragment: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteSumOrderByAggregateInputSchema: z.ZodType<Prisma.NoteSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_Fragment: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameModeCountOrderByAggregateInputSchema: z.ZodType<Prisma.GameModeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameModeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GameModeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameModeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GameModeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameModeMinOrderByAggregateInputSchema: z.ZodType<Prisma.GameModeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameModeSumOrderByAggregateInputSchema: z.ZodType<Prisma.GameModeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_levelResult: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultFragmentAnswerListRelationFilterSchema: z.ZodType<Prisma.LevelResultFragmentAnswerListRelationFilter> = z.object({
  every: z.lazy(() => LevelResultFragmentAnswerWhereInputSchema).optional(),
  some: z.lazy(() => LevelResultFragmentAnswerWhereInputSchema).optional(),
  none: z.lazy(() => LevelResultFragmentAnswerWhereInputSchema).optional()
}).strict();

export const LevelResultFragmentAnswerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_User: z.lazy(() => SortOrderSchema).optional(),
  playDate: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  timesListenedAgain: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  reactionTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  timesListenedAgain: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  reactionTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_User: z.lazy(() => SortOrderSchema).optional(),
  playDate: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  timesListenedAgain: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  reactionTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_User: z.lazy(() => SortOrderSchema).optional(),
  playDate: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  timesListenedAgain: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  reactionTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultSumOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  timesListenedAgain: z.lazy(() => SortOrderSchema).optional(),
  transposed: z.lazy(() => SortOrderSchema).optional(),
  reactionTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const LevelResultFragmentAnswerCountOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_LevelResult: z.lazy(() => SortOrderSchema).optional(),
  answeredCorrectly: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultFragmentAnswerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_LevelResult: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultFragmentAnswerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_LevelResult: z.lazy(() => SortOrderSchema).optional(),
  answeredCorrectly: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultFragmentAnswerMinOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_LevelResult: z.lazy(() => SortOrderSchema).optional(),
  answeredCorrectly: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LevelResultFragmentAnswerSumOrderByAggregateInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_LevelResult: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
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

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
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

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RestGehoorCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.RestGehoorCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RestGehoorCreateWithoutUserInputSchema),z.lazy(() => RestGehoorUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RestGehoorCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => RestGehoorWhereUniqueInputSchema).optional()
}).strict();

export const TypeCICreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.TypeCICreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TypeCICreateWithoutUserInputSchema),z.lazy(() => TypeCIUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TypeCICreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => TypeCIWhereUniqueInputSchema).optional()
}).strict();

export const RoleCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const TeamCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutUsersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const LevelResultCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LevelResultCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultCreateWithoutUserInputSchema).array(),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultCreateWithoutUserInputSchema).array(),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema),z.lazy(() => LevelResultCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultWhereUniqueInputSchema),z.lazy(() => LevelResultWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
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

export const RestGehoorUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.RestGehoorUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RestGehoorCreateWithoutUserInputSchema),z.lazy(() => RestGehoorUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RestGehoorCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => RestGehoorUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => RestGehoorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RestGehoorUpdateWithoutUserInputSchema),z.lazy(() => RestGehoorUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const TypeCIUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.TypeCIUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TypeCICreateWithoutUserInputSchema),z.lazy(() => TypeCIUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TypeCICreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => TypeCIUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => TypeCIWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TypeCIUpdateWithoutUserInputSchema),z.lazy(() => TypeCIUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const RoleUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const TeamUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutUsersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithoutUsersInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
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

export const UserCreateNestedManyWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRestGehoorInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRestGehoorInputSchema),z.lazy(() => UserCreateWithoutRestGehoorInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRestGehoorInputSchema),z.lazy(() => UserCreateOrConnectWithoutRestGehoorInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRestGehoorInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRestGehoorInputSchema),z.lazy(() => UserCreateWithoutRestGehoorInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRestGehoorInputSchema),z.lazy(() => UserCreateOrConnectWithoutRestGehoorInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateManyWithoutRestGehoorNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRestGehoorNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRestGehoorInputSchema),z.lazy(() => UserCreateWithoutRestGehoorInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRestGehoorInputSchema),z.lazy(() => UserCreateOrConnectWithoutRestGehoorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRestGehoorInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRestGehoorInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRestGehoorInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRestGehoorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRestGehoorInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRestGehoorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutRestGehoorNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRestGehoorNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRestGehoorInputSchema),z.lazy(() => UserCreateWithoutRestGehoorInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRestGehoorInputSchema),z.lazy(() => UserCreateOrConnectWithoutRestGehoorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRestGehoorInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRestGehoorInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRestGehoorInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRestGehoorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRestGehoorInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRestGehoorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutTypeCIInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutTypeCIInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTypeCIInputSchema),z.lazy(() => UserCreateWithoutTypeCIInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTypeCIInputSchema),z.lazy(() => UserCreateOrConnectWithoutTypeCIInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutTypeCIInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutTypeCIInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTypeCIInputSchema),z.lazy(() => UserCreateWithoutTypeCIInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTypeCIInputSchema),z.lazy(() => UserCreateOrConnectWithoutTypeCIInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutTypeCINestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutTypeCINestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTypeCIInputSchema),z.lazy(() => UserCreateWithoutTypeCIInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTypeCIInputSchema),z.lazy(() => UserCreateOrConnectWithoutTypeCIInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTypeCIInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutTypeCIInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTypeCIInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutTypeCIInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTypeCIInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutTypeCIInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutTypeCINestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutTypeCINestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTypeCIInputSchema),z.lazy(() => UserCreateWithoutTypeCIInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTypeCIInputSchema),z.lazy(() => UserCreateOrConnectWithoutTypeCIInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTypeCIInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutTypeCIInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTypeCIInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutTypeCIInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTypeCIInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutTypeCIInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamCreateNestedManyWithoutKliniekInputSchema: z.ZodType<Prisma.TeamCreateNestedManyWithoutKliniekInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutKliniekInputSchema),z.lazy(() => TeamCreateWithoutKliniekInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutKliniekInputSchema),z.lazy(() => TeamCreateOrConnectWithoutKliniekInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedCreateNestedManyWithoutKliniekInputSchema: z.ZodType<Prisma.TeamUncheckedCreateNestedManyWithoutKliniekInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutKliniekInputSchema),z.lazy(() => TeamCreateWithoutKliniekInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutKliniekInputSchema),z.lazy(() => TeamCreateOrConnectWithoutKliniekInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamUpdateManyWithoutKliniekNestedInputSchema: z.ZodType<Prisma.TeamUpdateManyWithoutKliniekNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutKliniekInputSchema),z.lazy(() => TeamCreateWithoutKliniekInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutKliniekInputSchema),z.lazy(() => TeamCreateOrConnectWithoutKliniekInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutKliniekInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutKliniekInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutKliniekInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutKliniekInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutKliniekInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutKliniekInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyWithoutKliniekNestedInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutKliniekNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutKliniekInputSchema),z.lazy(() => TeamCreateWithoutKliniekInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutKliniekInputSchema),z.lazy(() => TeamCreateOrConnectWithoutKliniekInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutKliniekInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutKliniekInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutKliniekInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutKliniekInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutKliniekInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutKliniekInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KliniekCreateNestedOneWithoutTeamInputSchema: z.ZodType<Prisma.KliniekCreateNestedOneWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => KliniekCreateWithoutTeamInputSchema),z.lazy(() => KliniekUncheckedCreateWithoutTeamInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KliniekCreateOrConnectWithoutTeamInputSchema).optional(),
  connect: z.lazy(() => KliniekWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTeamInputSchema),z.lazy(() => UserCreateWithoutTeamInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTeamInputSchema),z.lazy(() => UserCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameCreateNestedManyWithoutTeamsInputSchema: z.ZodType<Prisma.GameCreateNestedManyWithoutTeamsInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutTeamsInputSchema),z.lazy(() => GameCreateWithoutTeamsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutTeamsInputSchema),z.lazy(() => GameCreateOrConnectWithoutTeamsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTeamInputSchema),z.lazy(() => UserCreateWithoutTeamInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTeamInputSchema),z.lazy(() => UserCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedCreateNestedManyWithoutTeamsInputSchema: z.ZodType<Prisma.GameUncheckedCreateNestedManyWithoutTeamsInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutTeamsInputSchema),z.lazy(() => GameCreateWithoutTeamsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutTeamsInputSchema),z.lazy(() => GameCreateOrConnectWithoutTeamsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const KliniekUpdateOneWithoutTeamNestedInputSchema: z.ZodType<Prisma.KliniekUpdateOneWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => KliniekCreateWithoutTeamInputSchema),z.lazy(() => KliniekUncheckedCreateWithoutTeamInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => KliniekCreateOrConnectWithoutTeamInputSchema).optional(),
  upsert: z.lazy(() => KliniekUpsertWithoutTeamInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => KliniekWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => KliniekUpdateWithoutTeamInputSchema),z.lazy(() => KliniekUncheckedUpdateWithoutTeamInputSchema) ]).optional(),
}).strict();

export const UserUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTeamInputSchema),z.lazy(() => UserCreateWithoutTeamInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTeamInputSchema),z.lazy(() => UserCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameUpdateManyWithoutTeamsNestedInputSchema: z.ZodType<Prisma.GameUpdateManyWithoutTeamsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutTeamsInputSchema),z.lazy(() => GameCreateWithoutTeamsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutTeamsInputSchema),z.lazy(() => GameCreateOrConnectWithoutTeamsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutTeamsInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutTeamsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutTeamsInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutTeamsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutTeamsInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutTeamsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTeamInputSchema),z.lazy(() => UserCreateWithoutTeamInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTeamInputSchema),z.lazy(() => UserCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedUpdateManyWithoutTeamsNestedInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutTeamsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutTeamsInputSchema),z.lazy(() => GameCreateWithoutTeamsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutTeamsInputSchema),z.lazy(() => GameCreateOrConnectWithoutTeamsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutTeamsInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutTeamsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutTeamsInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutTeamsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutTeamsInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutTeamsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamCreateNestedManyWithoutGameInputSchema: z.ZodType<Prisma.TeamCreateNestedManyWithoutGameInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutGameInputSchema),z.lazy(() => TeamCreateWithoutGameInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutGameInputSchema),z.lazy(() => TeamCreateOrConnectWithoutGameInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelCreateNestedManyWithoutGameInputSchema: z.ZodType<Prisma.LevelCreateNestedManyWithoutGameInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutGameInputSchema),z.lazy(() => LevelCreateWithoutGameInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutGameInputSchema),z.lazy(() => LevelCreateOrConnectWithoutGameInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedCreateNestedManyWithoutGameInputSchema: z.ZodType<Prisma.TeamUncheckedCreateNestedManyWithoutGameInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutGameInputSchema),z.lazy(() => TeamCreateWithoutGameInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutGameInputSchema),z.lazy(() => TeamCreateOrConnectWithoutGameInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelUncheckedCreateNestedManyWithoutGameInputSchema: z.ZodType<Prisma.LevelUncheckedCreateNestedManyWithoutGameInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutGameInputSchema),z.lazy(() => LevelCreateWithoutGameInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutGameInputSchema),z.lazy(() => LevelCreateOrConnectWithoutGameInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamUpdateManyWithoutGameNestedInputSchema: z.ZodType<Prisma.TeamUpdateManyWithoutGameNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutGameInputSchema),z.lazy(() => TeamCreateWithoutGameInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutGameInputSchema),z.lazy(() => TeamCreateOrConnectWithoutGameInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutGameInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutGameInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutGameInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutGameInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutGameInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutGameInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelUpdateManyWithoutGameNestedInputSchema: z.ZodType<Prisma.LevelUpdateManyWithoutGameNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutGameInputSchema),z.lazy(() => LevelCreateWithoutGameInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutGameInputSchema),z.lazy(() => LevelCreateOrConnectWithoutGameInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelUpsertWithWhereUniqueWithoutGameInputSchema),z.lazy(() => LevelUpsertWithWhereUniqueWithoutGameInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithWhereUniqueWithoutGameInputSchema),z.lazy(() => LevelUpdateWithWhereUniqueWithoutGameInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelUpdateManyWithWhereWithoutGameInputSchema),z.lazy(() => LevelUpdateManyWithWhereWithoutGameInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyWithoutGameNestedInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutGameNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutGameInputSchema),z.lazy(() => TeamCreateWithoutGameInputSchema).array(),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamCreateOrConnectWithoutGameInputSchema),z.lazy(() => TeamCreateOrConnectWithoutGameInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamUpsertWithWhereUniqueWithoutGameInputSchema),z.lazy(() => TeamUpsertWithWhereUniqueWithoutGameInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamWhereUniqueInputSchema),z.lazy(() => TeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamUpdateWithWhereUniqueWithoutGameInputSchema),z.lazy(() => TeamUpdateWithWhereUniqueWithoutGameInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamUpdateManyWithWhereWithoutGameInputSchema),z.lazy(() => TeamUpdateManyWithWhereWithoutGameInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelUncheckedUpdateManyWithoutGameNestedInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateManyWithoutGameNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutGameInputSchema),z.lazy(() => LevelCreateWithoutGameInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutGameInputSchema),z.lazy(() => LevelCreateOrConnectWithoutGameInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelUpsertWithWhereUniqueWithoutGameInputSchema),z.lazy(() => LevelUpsertWithWhereUniqueWithoutGameInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithWhereUniqueWithoutGameInputSchema),z.lazy(() => LevelUpdateWithWhereUniqueWithoutGameInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelUpdateManyWithWhereWithoutGameInputSchema),z.lazy(() => LevelUpdateManyWithWhereWithoutGameInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameCreateNestedOneWithoutLevelsInputSchema: z.ZodType<Prisma.GameCreateNestedOneWithoutLevelsInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutLevelsInputSchema),z.lazy(() => GameUncheckedCreateWithoutLevelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GameCreateOrConnectWithoutLevelsInputSchema).optional(),
  connect: z.lazy(() => GameWhereUniqueInputSchema).optional()
}).strict();

export const FragmentCreateNestedManyWithoutLevelInputSchema: z.ZodType<Prisma.FragmentCreateNestedManyWithoutLevelInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelInputSchema),z.lazy(() => FragmentCreateWithoutLevelInputSchema).array(),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FragmentCreateOrConnectWithoutLevelInputSchema),z.lazy(() => FragmentCreateOrConnectWithoutLevelInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameModeCreateNestedManyWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeCreateNestedManyWithoutLevelsInput> = z.object({
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelsInputSchema),z.lazy(() => GameModeCreateWithoutLevelsInputSchema).array(),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameModeCreateOrConnectWithoutLevelsInputSchema),z.lazy(() => GameModeCreateOrConnectWithoutLevelsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultCreateNestedOneWithoutLevelsInputSchema: z.ZodType<Prisma.LevelResultCreateNestedOneWithoutLevelsInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutLevelsInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutLevelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelResultCreateOrConnectWithoutLevelsInputSchema).optional(),
  connect: z.lazy(() => LevelResultWhereUniqueInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateNestedManyWithoutLevelInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateNestedManyWithoutLevelInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelInputSchema),z.lazy(() => FragmentCreateWithoutLevelInputSchema).array(),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FragmentCreateOrConnectWithoutLevelInputSchema),z.lazy(() => FragmentCreateOrConnectWithoutLevelInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameModeUncheckedCreateNestedManyWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeUncheckedCreateNestedManyWithoutLevelsInput> = z.object({
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelsInputSchema),z.lazy(() => GameModeCreateWithoutLevelsInputSchema).array(),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameModeCreateOrConnectWithoutLevelsInputSchema),z.lazy(() => GameModeCreateOrConnectWithoutLevelsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUpdateOneWithoutLevelsNestedInputSchema: z.ZodType<Prisma.GameUpdateOneWithoutLevelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutLevelsInputSchema),z.lazy(() => GameUncheckedCreateWithoutLevelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GameCreateOrConnectWithoutLevelsInputSchema).optional(),
  upsert: z.lazy(() => GameUpsertWithoutLevelsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => GameWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithoutLevelsInputSchema),z.lazy(() => GameUncheckedUpdateWithoutLevelsInputSchema) ]).optional(),
}).strict();

export const FragmentUpdateManyWithoutLevelNestedInputSchema: z.ZodType<Prisma.FragmentUpdateManyWithoutLevelNestedInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelInputSchema),z.lazy(() => FragmentCreateWithoutLevelInputSchema).array(),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FragmentCreateOrConnectWithoutLevelInputSchema),z.lazy(() => FragmentCreateOrConnectWithoutLevelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FragmentUpsertWithWhereUniqueWithoutLevelInputSchema),z.lazy(() => FragmentUpsertWithWhereUniqueWithoutLevelInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FragmentUpdateWithWhereUniqueWithoutLevelInputSchema),z.lazy(() => FragmentUpdateWithWhereUniqueWithoutLevelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FragmentUpdateManyWithWhereWithoutLevelInputSchema),z.lazy(() => FragmentUpdateManyWithWhereWithoutLevelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FragmentScalarWhereInputSchema),z.lazy(() => FragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameModeUpdateManyWithoutLevelsNestedInputSchema: z.ZodType<Prisma.GameModeUpdateManyWithoutLevelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelsInputSchema),z.lazy(() => GameModeCreateWithoutLevelsInputSchema).array(),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameModeCreateOrConnectWithoutLevelsInputSchema),z.lazy(() => GameModeCreateOrConnectWithoutLevelsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameModeUpsertWithWhereUniqueWithoutLevelsInputSchema),z.lazy(() => GameModeUpsertWithWhereUniqueWithoutLevelsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameModeUpdateWithWhereUniqueWithoutLevelsInputSchema),z.lazy(() => GameModeUpdateWithWhereUniqueWithoutLevelsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameModeUpdateManyWithWhereWithoutLevelsInputSchema),z.lazy(() => GameModeUpdateManyWithWhereWithoutLevelsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameModeScalarWhereInputSchema),z.lazy(() => GameModeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultUpdateOneWithoutLevelsNestedInputSchema: z.ZodType<Prisma.LevelResultUpdateOneWithoutLevelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutLevelsInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutLevelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelResultCreateOrConnectWithoutLevelsInputSchema).optional(),
  upsert: z.lazy(() => LevelResultUpsertWithoutLevelsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => LevelResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutLevelsInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutLevelsInputSchema) ]).optional(),
}).strict();

export const FragmentUncheckedUpdateManyWithoutLevelNestedInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateManyWithoutLevelNestedInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelInputSchema),z.lazy(() => FragmentCreateWithoutLevelInputSchema).array(),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FragmentCreateOrConnectWithoutLevelInputSchema),z.lazy(() => FragmentCreateOrConnectWithoutLevelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FragmentUpsertWithWhereUniqueWithoutLevelInputSchema),z.lazy(() => FragmentUpsertWithWhereUniqueWithoutLevelInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FragmentWhereUniqueInputSchema),z.lazy(() => FragmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FragmentUpdateWithWhereUniqueWithoutLevelInputSchema),z.lazy(() => FragmentUpdateWithWhereUniqueWithoutLevelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FragmentUpdateManyWithWhereWithoutLevelInputSchema),z.lazy(() => FragmentUpdateManyWithWhereWithoutLevelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FragmentScalarWhereInputSchema),z.lazy(() => FragmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameModeUncheckedUpdateManyWithoutLevelsNestedInputSchema: z.ZodType<Prisma.GameModeUncheckedUpdateManyWithoutLevelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelsInputSchema),z.lazy(() => GameModeCreateWithoutLevelsInputSchema).array(),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameModeCreateOrConnectWithoutLevelsInputSchema),z.lazy(() => GameModeCreateOrConnectWithoutLevelsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameModeUpsertWithWhereUniqueWithoutLevelsInputSchema),z.lazy(() => GameModeUpsertWithWhereUniqueWithoutLevelsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameModeUpdateWithWhereUniqueWithoutLevelsInputSchema),z.lazy(() => GameModeUpdateWithWhereUniqueWithoutLevelsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameModeUpdateManyWithWhereWithoutLevelsInputSchema),z.lazy(() => GameModeUpdateManyWithWhereWithoutLevelsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameModeScalarWhereInputSchema),z.lazy(() => GameModeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NoteCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.NoteCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentInputSchema),z.lazy(() => NoteCreateWithoutFragmentInputSchema).array(),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => NoteCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelCreateNestedManyWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelCreateNestedManyWithoutFragmentsInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelCreateWithoutFragmentsInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema),z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NoteUncheckedCreateNestedManyWithoutFragmentInputSchema: z.ZodType<Prisma.NoteUncheckedCreateNestedManyWithoutFragmentInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentInputSchema),z.lazy(() => NoteCreateWithoutFragmentInputSchema).array(),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => NoteCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelUncheckedCreateNestedManyWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUncheckedCreateNestedManyWithoutFragmentsInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelCreateWithoutFragmentsInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema),z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NoteUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.NoteUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentInputSchema),z.lazy(() => NoteCreateWithoutFragmentInputSchema).array(),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => NoteCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NoteUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => NoteUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NoteUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => NoteUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NoteUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => NoteUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NoteScalarWhereInputSchema),z.lazy(() => NoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelUpdateManyWithoutFragmentsNestedInputSchema: z.ZodType<Prisma.LevelUpdateManyWithoutFragmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelCreateWithoutFragmentsInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema),z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelUpsertWithWhereUniqueWithoutFragmentsInputSchema),z.lazy(() => LevelUpsertWithWhereUniqueWithoutFragmentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithWhereUniqueWithoutFragmentsInputSchema),z.lazy(() => LevelUpdateWithWhereUniqueWithoutFragmentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelUpdateManyWithWhereWithoutFragmentsInputSchema),z.lazy(() => LevelUpdateManyWithWhereWithoutFragmentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NoteUncheckedUpdateManyWithoutFragmentNestedInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyWithoutFragmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentInputSchema),z.lazy(() => NoteCreateWithoutFragmentInputSchema).array(),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteCreateOrConnectWithoutFragmentInputSchema),z.lazy(() => NoteCreateOrConnectWithoutFragmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NoteUpsertWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => NoteUpsertWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NoteUpdateWithWhereUniqueWithoutFragmentInputSchema),z.lazy(() => NoteUpdateWithWhereUniqueWithoutFragmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NoteUpdateManyWithWhereWithoutFragmentInputSchema),z.lazy(() => NoteUpdateManyWithWhereWithoutFragmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NoteScalarWhereInputSchema),z.lazy(() => NoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelUncheckedUpdateManyWithoutFragmentsNestedInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateManyWithoutFragmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelCreateWithoutFragmentsInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema),z.lazy(() => LevelCreateOrConnectWithoutFragmentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelUpsertWithWhereUniqueWithoutFragmentsInputSchema),z.lazy(() => LevelUpsertWithWhereUniqueWithoutFragmentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithWhereUniqueWithoutFragmentsInputSchema),z.lazy(() => LevelUpdateWithWhereUniqueWithoutFragmentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelUpdateManyWithWhereWithoutFragmentsInputSchema),z.lazy(() => LevelUpdateManyWithWhereWithoutFragmentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FragmentCreateNestedOneWithoutNotesInputSchema: z.ZodType<Prisma.FragmentCreateNestedOneWithoutNotesInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional()
}).strict();

export const FragmentUpdateOneRequiredWithoutNotesNestedInputSchema: z.ZodType<Prisma.FragmentUpdateOneRequiredWithoutNotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FragmentCreateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FragmentCreateOrConnectWithoutNotesInputSchema).optional(),
  upsert: z.lazy(() => FragmentUpsertWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => FragmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FragmentUpdateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutNotesInputSchema) ]).optional(),
}).strict();

export const LevelCreateNestedManyWithoutGameModesInputSchema: z.ZodType<Prisma.LevelCreateNestedManyWithoutGameModesInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutGameModesInputSchema),z.lazy(() => LevelCreateWithoutGameModesInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutGameModesInputSchema),z.lazy(() => LevelCreateOrConnectWithoutGameModesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultCreateNestedOneWithoutGameModesInputSchema: z.ZodType<Prisma.LevelResultCreateNestedOneWithoutGameModesInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutGameModesInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutGameModesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelResultCreateOrConnectWithoutGameModesInputSchema).optional(),
  connect: z.lazy(() => LevelResultWhereUniqueInputSchema).optional()
}).strict();

export const LevelUncheckedCreateNestedManyWithoutGameModesInputSchema: z.ZodType<Prisma.LevelUncheckedCreateNestedManyWithoutGameModesInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutGameModesInputSchema),z.lazy(() => LevelCreateWithoutGameModesInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutGameModesInputSchema),z.lazy(() => LevelCreateOrConnectWithoutGameModesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelUpdateManyWithoutGameModesNestedInputSchema: z.ZodType<Prisma.LevelUpdateManyWithoutGameModesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutGameModesInputSchema),z.lazy(() => LevelCreateWithoutGameModesInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutGameModesInputSchema),z.lazy(() => LevelCreateOrConnectWithoutGameModesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelUpsertWithWhereUniqueWithoutGameModesInputSchema),z.lazy(() => LevelUpsertWithWhereUniqueWithoutGameModesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithWhereUniqueWithoutGameModesInputSchema),z.lazy(() => LevelUpdateWithWhereUniqueWithoutGameModesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelUpdateManyWithWhereWithoutGameModesInputSchema),z.lazy(() => LevelUpdateManyWithWhereWithoutGameModesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultUpdateOneWithoutGameModesNestedInputSchema: z.ZodType<Prisma.LevelResultUpdateOneWithoutGameModesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutGameModesInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutGameModesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelResultCreateOrConnectWithoutGameModesInputSchema).optional(),
  upsert: z.lazy(() => LevelResultUpsertWithoutGameModesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => LevelResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutGameModesInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutGameModesInputSchema) ]).optional(),
}).strict();

export const LevelUncheckedUpdateManyWithoutGameModesNestedInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateManyWithoutGameModesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutGameModesInputSchema),z.lazy(() => LevelCreateWithoutGameModesInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutGameModesInputSchema),z.lazy(() => LevelCreateOrConnectWithoutGameModesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelUpsertWithWhereUniqueWithoutGameModesInputSchema),z.lazy(() => LevelUpsertWithWhereUniqueWithoutGameModesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithWhereUniqueWithoutGameModesInputSchema),z.lazy(() => LevelUpdateWithWhereUniqueWithoutGameModesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelUpdateManyWithWhereWithoutGameModesInputSchema),z.lazy(() => LevelUpdateManyWithWhereWithoutGameModesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLevelResultsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLevelResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLevelResultsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const GameModeCreateNestedManyWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeCreateNestedManyWithoutLevelResultInput> = z.object({
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeCreateWithoutLevelResultInputSchema).array(),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameModeCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => GameModeCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelCreateNestedManyWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelCreateNestedManyWithoutLevelResultInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutLevelResultInputSchema),z.lazy(() => LevelCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentAnswerCreateNestedManyWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerCreateNestedManyWithoutLevelResultInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameModeUncheckedCreateNestedManyWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeUncheckedCreateNestedManyWithoutLevelResultInput> = z.object({
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeCreateWithoutLevelResultInputSchema).array(),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameModeCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => GameModeCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelUncheckedCreateNestedManyWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelUncheckedCreateNestedManyWithoutLevelResultInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutLevelResultInputSchema),z.lazy(() => LevelCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentAnswerUncheckedCreateNestedManyWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUncheckedCreateNestedManyWithoutLevelResultInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutLevelResultsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLevelResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLevelResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLevelResultsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLevelResultsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLevelResultsInputSchema) ]).optional(),
}).strict();

export const GameModeUpdateManyWithoutLevelResultNestedInputSchema: z.ZodType<Prisma.GameModeUpdateManyWithoutLevelResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeCreateWithoutLevelResultInputSchema).array(),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameModeCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => GameModeCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameModeUpsertWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => GameModeUpsertWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameModeUpdateWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => GameModeUpdateWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameModeUpdateManyWithWhereWithoutLevelResultInputSchema),z.lazy(() => GameModeUpdateManyWithWhereWithoutLevelResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameModeScalarWhereInputSchema),z.lazy(() => GameModeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelUpdateManyWithoutLevelResultNestedInputSchema: z.ZodType<Prisma.LevelUpdateManyWithoutLevelResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutLevelResultInputSchema),z.lazy(() => LevelCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelUpsertWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelUpsertWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelUpdateWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelUpdateManyWithWhereWithoutLevelResultInputSchema),z.lazy(() => LevelUpdateManyWithWhereWithoutLevelResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentAnswerUpdateManyWithoutLevelResultNestedInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpdateManyWithoutLevelResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelResultFragmentAnswerUpsertWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUpsertWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelResultFragmentAnswerUpdateWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUpdateWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelResultFragmentAnswerUpdateManyWithWhereWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUpdateManyWithWhereWithoutLevelResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema),z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameModeUncheckedUpdateManyWithoutLevelResultNestedInputSchema: z.ZodType<Prisma.GameModeUncheckedUpdateManyWithoutLevelResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeCreateWithoutLevelResultInputSchema).array(),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameModeCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => GameModeCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameModeUpsertWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => GameModeUpsertWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameModeWhereUniqueInputSchema),z.lazy(() => GameModeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameModeUpdateWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => GameModeUpdateWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameModeUpdateManyWithWhereWithoutLevelResultInputSchema),z.lazy(() => GameModeUpdateManyWithWhereWithoutLevelResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameModeScalarWhereInputSchema),z.lazy(() => GameModeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelUncheckedUpdateManyWithoutLevelResultNestedInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateManyWithoutLevelResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelCreateWithoutLevelResultInputSchema),z.lazy(() => LevelCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelUpsertWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelUpsertWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelWhereUniqueInputSchema),z.lazy(() => LevelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelUpdateWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelUpdateWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelUpdateManyWithWhereWithoutLevelResultInputSchema),z.lazy(() => LevelUpdateManyWithWhereWithoutLevelResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultNestedInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema).array(),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LevelResultFragmentAnswerUpsertWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUpsertWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LevelResultFragmentAnswerUpdateWithWhereUniqueWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUpdateWithWhereUniqueWithoutLevelResultInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LevelResultFragmentAnswerUpdateManyWithWhereWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUpdateManyWithWhereWithoutLevelResultInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema),z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LevelResultCreateNestedOneWithoutLevelResultFragmentAnswersInputSchema: z.ZodType<Prisma.LevelResultCreateNestedOneWithoutLevelResultFragmentAnswersInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutLevelResultFragmentAnswersInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutLevelResultFragmentAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelResultCreateOrConnectWithoutLevelResultFragmentAnswersInputSchema).optional(),
  connect: z.lazy(() => LevelResultWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const LevelResultUpdateOneRequiredWithoutLevelResultFragmentAnswersNestedInputSchema: z.ZodType<Prisma.LevelResultUpdateOneRequiredWithoutLevelResultFragmentAnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => LevelResultCreateWithoutLevelResultFragmentAnswersInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutLevelResultFragmentAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LevelResultCreateOrConnectWithoutLevelResultFragmentAnswersInputSchema).optional(),
  upsert: z.lazy(() => LevelResultUpsertWithoutLevelResultFragmentAnswersInputSchema).optional(),
  connect: z.lazy(() => LevelResultWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutLevelResultFragmentAnswersInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutLevelResultFragmentAnswersInputSchema) ]).optional(),
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

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
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

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
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

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorCreateNestedOneWithoutUserInputSchema).optional(),
  typeCI: z.lazy(() => TypeCICreateNestedOneWithoutUserInputSchema).optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutUsersInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  id_restGehoor: z.number().optional().nullable(),
  id_TypeCI: z.number().optional().nullable(),
  id_Role: z.number().optional().nullable(),
  id_Team: z.number().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorUpdateOneWithoutUserNestedInputSchema).optional(),
  typeCI: z.lazy(() => TypeCIUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneWithoutUsersNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateOneWithoutUsersNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorCreateNestedOneWithoutUserInputSchema).optional(),
  typeCI: z.lazy(() => TypeCICreateNestedOneWithoutUserInputSchema).optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutUsersInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  id_restGehoor: z.number().optional().nullable(),
  id_TypeCI: z.number().optional().nullable(),
  id_Role: z.number().optional().nullable(),
  id_Team: z.number().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorUpdateOneWithoutUserNestedInputSchema).optional(),
  typeCI: z.lazy(() => TypeCIUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneWithoutUsersNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateOneWithoutUsersNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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

export const RestGehoorCreateWithoutUserInputSchema: z.ZodType<Prisma.RestGehoorCreateWithoutUserInput> = z.object({
  created_at: z.coerce.date().optional(),
  restGehoor: z.number()
}).strict();

export const RestGehoorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RestGehoorUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  created_at: z.coerce.date().optional(),
  restGehoor: z.number()
}).strict();

export const RestGehoorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RestGehoorCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RestGehoorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RestGehoorCreateWithoutUserInputSchema),z.lazy(() => RestGehoorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TypeCICreateWithoutUserInputSchema: z.ZodType<Prisma.TypeCICreateWithoutUserInput> = z.object({
  ciName: z.string(),
  merk: z.string()
}).strict();

export const TypeCIUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TypeCIUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  ciName: z.string(),
  merk: z.string()
}).strict();

export const TypeCICreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TypeCICreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TypeCIWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TypeCICreateWithoutUserInputSchema),z.lazy(() => TypeCIUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RoleCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateWithoutUsersInput> = z.object({
  name: z.string()
}).strict();

export const RoleUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutUsersInput> = z.object({
  id: z.number().optional(),
  name: z.string()
}).strict();

export const RoleCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const TeamCreateWithoutUsersInputSchema: z.ZodType<Prisma.TeamCreateWithoutUsersInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  kliniek: z.lazy(() => KliniekCreateNestedOneWithoutTeamInputSchema).optional(),
  game: z.lazy(() => GameCreateNestedManyWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutUsersInput> = z.object({
  id: z.number().optional(),
  id_Kliniek: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  game: z.lazy(() => GameUncheckedCreateNestedManyWithoutTeamsInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutUsersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const LevelResultCreateWithoutUserInputSchema: z.ZodType<Prisma.LevelResultCreateWithoutUserInput> = z.object({
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number(),
  transposed: z.number(),
  reactionTime: z.number(),
  gameModes: z.lazy(() => GameModeCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levels: z.lazy(() => LevelCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number(),
  transposed: z.number(),
  reactionTime: z.number(),
  gameModes: z.lazy(() => GameModeUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levels: z.lazy(() => LevelUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LevelResultCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LevelResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutUserInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutUserInputSchema) ]),
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

export const RestGehoorUpsertWithoutUserInputSchema: z.ZodType<Prisma.RestGehoorUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => RestGehoorUpdateWithoutUserInputSchema),z.lazy(() => RestGehoorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RestGehoorCreateWithoutUserInputSchema),z.lazy(() => RestGehoorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RestGehoorUpdateWithoutUserInputSchema: z.ZodType<Prisma.RestGehoorUpdateWithoutUserInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  restGehoor: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RestGehoorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RestGehoorUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  restGehoor: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypeCIUpsertWithoutUserInputSchema: z.ZodType<Prisma.TypeCIUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => TypeCIUpdateWithoutUserInputSchema),z.lazy(() => TypeCIUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TypeCICreateWithoutUserInputSchema),z.lazy(() => TypeCIUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TypeCIUpdateWithoutUserInputSchema: z.ZodType<Prisma.TypeCIUpdateWithoutUserInput> = z.object({
  ciName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  merk: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypeCIUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TypeCIUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ciName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  merk: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUpsertWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const RoleUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpdateWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUpsertWithoutUsersInputSchema: z.ZodType<Prisma.TeamUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutUsersInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutUsersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const TeamUpdateWithoutUsersInputSchema: z.ZodType<Prisma.TeamUpdateWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kliniek: z.lazy(() => KliniekUpdateOneWithoutTeamNestedInputSchema).optional(),
  game: z.lazy(() => GameUpdateManyWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Kliniek: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  game: z.lazy(() => GameUncheckedUpdateManyWithoutTeamsNestedInputSchema).optional()
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
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_User: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  playDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  timesListenedAgain: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  transposed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reactionTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserCreateWithoutRestGehoorInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  typeCI: z.lazy(() => TypeCICreateNestedOneWithoutUserInputSchema).optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutUsersInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRestGehoorInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  id_TypeCI: z.number().optional().nullable(),
  id_Role: z.number().optional().nullable(),
  id_Team: z.number().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRestGehoorInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRestGehoorInputSchema),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRestGehoorInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRestGehoorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRestGehoorInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRestGehoorInputSchema),z.lazy(() => UserUncheckedCreateWithoutRestGehoorInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRestGehoorInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRestGehoorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRestGehoorInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRestGehoorInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_restGehoor: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  id_TypeCI: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  id_Role: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  id_Team: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  hadTraining: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  experience: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  processor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutTypeCIInputSchema: z.ZodType<Prisma.UserCreateWithoutTypeCIInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorCreateNestedOneWithoutUserInputSchema).optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutUsersInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTypeCIInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTypeCIInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  id_restGehoor: z.number().optional().nullable(),
  id_Role: z.number().optional().nullable(),
  id_Team: z.number().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTypeCIInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTypeCIInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTypeCIInputSchema),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutTypeCIInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutTypeCIInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutTypeCIInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTypeCIInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTypeCIInputSchema),z.lazy(() => UserUncheckedCreateWithoutTypeCIInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutTypeCIInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutTypeCIInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutTypeCIInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTypeCIInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutTypeCIInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutTypeCIInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorCreateNestedOneWithoutUserInputSchema).optional(),
  typeCI: z.lazy(() => TypeCICreateNestedOneWithoutUserInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutUsersInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  id_restGehoor: z.number().optional().nullable(),
  id_TypeCI: z.number().optional().nullable(),
  id_Team: z.number().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const TeamCreateWithoutKliniekInputSchema: z.ZodType<Prisma.TeamCreateWithoutKliniekInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutTeamInputSchema).optional(),
  game: z.lazy(() => GameCreateNestedManyWithoutTeamsInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutKliniekInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutKliniekInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  game: z.lazy(() => GameUncheckedCreateNestedManyWithoutTeamsInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutKliniekInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutKliniekInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutKliniekInputSchema),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema) ]),
}).strict();

export const TeamUpsertWithWhereUniqueWithoutKliniekInputSchema: z.ZodType<Prisma.TeamUpsertWithWhereUniqueWithoutKliniekInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TeamUpdateWithoutKliniekInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutKliniekInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutKliniekInputSchema),z.lazy(() => TeamUncheckedCreateWithoutKliniekInputSchema) ]),
}).strict();

export const TeamUpdateWithWhereUniqueWithoutKliniekInputSchema: z.ZodType<Prisma.TeamUpdateWithWhereUniqueWithoutKliniekInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateWithoutKliniekInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutKliniekInputSchema) ]),
}).strict();

export const TeamUpdateManyWithWhereWithoutKliniekInputSchema: z.ZodType<Prisma.TeamUpdateManyWithWhereWithoutKliniekInput> = z.object({
  where: z.lazy(() => TeamScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateManyMutationInputSchema),z.lazy(() => TeamUncheckedUpdateManyWithoutTeamInputSchema) ]),
}).strict();

export const TeamScalarWhereInputSchema: z.ZodType<Prisma.TeamScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamScalarWhereInputSchema),z.lazy(() => TeamScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_Kliniek: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const KliniekCreateWithoutTeamInputSchema: z.ZodType<Prisma.KliniekCreateWithoutTeamInput> = z.object({
  name: z.string()
}).strict();

export const KliniekUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.KliniekUncheckedCreateWithoutTeamInput> = z.object({
  id: z.number().optional(),
  name: z.string()
}).strict();

export const KliniekCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.KliniekCreateOrConnectWithoutTeamInput> = z.object({
  where: z.lazy(() => KliniekWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KliniekCreateWithoutTeamInputSchema),z.lazy(() => KliniekUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const UserCreateWithoutTeamInputSchema: z.ZodType<Prisma.UserCreateWithoutTeamInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorCreateNestedOneWithoutUserInputSchema).optional(),
  typeCI: z.lazy(() => TypeCICreateNestedOneWithoutUserInputSchema).optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTeamInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  id_restGehoor: z.number().optional().nullable(),
  id_TypeCI: z.number().optional().nullable(),
  id_Role: z.number().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTeamInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTeamInputSchema),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const GameCreateWithoutTeamsInputSchema: z.ZodType<Prisma.GameCreateWithoutTeamsInput> = z.object({
  name: z.string(),
  levels: z.lazy(() => LevelCreateNestedManyWithoutGameInputSchema).optional()
}).strict();

export const GameUncheckedCreateWithoutTeamsInputSchema: z.ZodType<Prisma.GameUncheckedCreateWithoutTeamsInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  levels: z.lazy(() => LevelUncheckedCreateNestedManyWithoutGameInputSchema).optional()
}).strict();

export const GameCreateOrConnectWithoutTeamsInputSchema: z.ZodType<Prisma.GameCreateOrConnectWithoutTeamsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameCreateWithoutTeamsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema) ]),
}).strict();

export const KliniekUpsertWithoutTeamInputSchema: z.ZodType<Prisma.KliniekUpsertWithoutTeamInput> = z.object({
  update: z.union([ z.lazy(() => KliniekUpdateWithoutTeamInputSchema),z.lazy(() => KliniekUncheckedUpdateWithoutTeamInputSchema) ]),
  create: z.union([ z.lazy(() => KliniekCreateWithoutTeamInputSchema),z.lazy(() => KliniekUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const KliniekUpdateWithoutTeamInputSchema: z.ZodType<Prisma.KliniekUpdateWithoutTeamInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KliniekUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.KliniekUncheckedUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutTeamInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTeamInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTeamInputSchema),z.lazy(() => UserUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutTeamInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTeamInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutTeamInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const GameUpsertWithWhereUniqueWithoutTeamsInputSchema: z.ZodType<Prisma.GameUpsertWithWhereUniqueWithoutTeamsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameUpdateWithoutTeamsInputSchema),z.lazy(() => GameUncheckedUpdateWithoutTeamsInputSchema) ]),
  create: z.union([ z.lazy(() => GameCreateWithoutTeamsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTeamsInputSchema) ]),
}).strict();

export const GameUpdateWithWhereUniqueWithoutTeamsInputSchema: z.ZodType<Prisma.GameUpdateWithWhereUniqueWithoutTeamsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameUpdateWithoutTeamsInputSchema),z.lazy(() => GameUncheckedUpdateWithoutTeamsInputSchema) ]),
}).strict();

export const GameUpdateManyWithWhereWithoutTeamsInputSchema: z.ZodType<Prisma.GameUpdateManyWithWhereWithoutTeamsInput> = z.object({
  where: z.lazy(() => GameScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameUpdateManyMutationInputSchema),z.lazy(() => GameUncheckedUpdateManyWithoutGameInputSchema) ]),
}).strict();

export const GameScalarWhereInputSchema: z.ZodType<Prisma.GameScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TeamCreateWithoutGameInputSchema: z.ZodType<Prisma.TeamCreateWithoutGameInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  kliniek: z.lazy(() => KliniekCreateNestedOneWithoutTeamInputSchema).optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutGameInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutGameInput> = z.object({
  id: z.number().optional(),
  id_Kliniek: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutGameInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutGameInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutGameInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema) ]),
}).strict();

export const LevelCreateWithoutGameInputSchema: z.ZodType<Prisma.LevelCreateWithoutGameInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number().optional().nullable(),
  fragmentToShow: z.number(),
  fragments: z.lazy(() => FragmentCreateNestedManyWithoutLevelInputSchema).optional(),
  gameModes: z.lazy(() => GameModeCreateNestedManyWithoutLevelsInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutLevelsInputSchema).optional()
}).strict();

export const LevelUncheckedCreateWithoutGameInputSchema: z.ZodType<Prisma.LevelUncheckedCreateWithoutGameInput> = z.object({
  id: z.number().optional(),
  id_levelResult: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number().optional().nullable(),
  fragmentToShow: z.number(),
  fragments: z.lazy(() => FragmentUncheckedCreateNestedManyWithoutLevelInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUncheckedCreateNestedManyWithoutLevelsInputSchema).optional()
}).strict();

export const LevelCreateOrConnectWithoutGameInputSchema: z.ZodType<Prisma.LevelCreateOrConnectWithoutGameInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelCreateWithoutGameInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema) ]),
}).strict();

export const TeamUpsertWithWhereUniqueWithoutGameInputSchema: z.ZodType<Prisma.TeamUpsertWithWhereUniqueWithoutGameInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TeamUpdateWithoutGameInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutGameInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutGameInputSchema),z.lazy(() => TeamUncheckedCreateWithoutGameInputSchema) ]),
}).strict();

export const TeamUpdateWithWhereUniqueWithoutGameInputSchema: z.ZodType<Prisma.TeamUpdateWithWhereUniqueWithoutGameInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateWithoutGameInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutGameInputSchema) ]),
}).strict();

export const TeamUpdateManyWithWhereWithoutGameInputSchema: z.ZodType<Prisma.TeamUpdateManyWithWhereWithoutGameInput> = z.object({
  where: z.lazy(() => TeamScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TeamUpdateManyMutationInputSchema),z.lazy(() => TeamUncheckedUpdateManyWithoutTeamsInputSchema) ]),
}).strict();

export const LevelUpsertWithWhereUniqueWithoutGameInputSchema: z.ZodType<Prisma.LevelUpsertWithWhereUniqueWithoutGameInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelUpdateWithoutGameInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutGameInputSchema) ]),
  create: z.union([ z.lazy(() => LevelCreateWithoutGameInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameInputSchema) ]),
}).strict();

export const LevelUpdateWithWhereUniqueWithoutGameInputSchema: z.ZodType<Prisma.LevelUpdateWithWhereUniqueWithoutGameInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelUpdateWithoutGameInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutGameInputSchema) ]),
}).strict();

export const LevelUpdateManyWithWhereWithoutGameInputSchema: z.ZodType<Prisma.LevelUpdateManyWithWhereWithoutGameInput> = z.object({
  where: z.lazy(() => LevelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelUpdateManyMutationInputSchema),z.lazy(() => LevelUncheckedUpdateManyWithoutLevelsInputSchema) ]),
}).strict();

export const LevelScalarWhereInputSchema: z.ZodType<Prisma.LevelScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelScalarWhereInputSchema),z.lazy(() => LevelScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_Game: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  id_levelResult: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  BPM: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  correctAnswers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cooldownTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  fragmentToShow: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const GameCreateWithoutLevelsInputSchema: z.ZodType<Prisma.GameCreateWithoutLevelsInput> = z.object({
  name: z.string(),
  teams: z.lazy(() => TeamCreateNestedManyWithoutGameInputSchema).optional()
}).strict();

export const GameUncheckedCreateWithoutLevelsInputSchema: z.ZodType<Prisma.GameUncheckedCreateWithoutLevelsInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  teams: z.lazy(() => TeamUncheckedCreateNestedManyWithoutGameInputSchema).optional()
}).strict();

export const GameCreateOrConnectWithoutLevelsInputSchema: z.ZodType<Prisma.GameCreateOrConnectWithoutLevelsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameCreateWithoutLevelsInputSchema),z.lazy(() => GameUncheckedCreateWithoutLevelsInputSchema) ]),
}).strict();

export const FragmentCreateWithoutLevelInputSchema: z.ZodType<Prisma.FragmentCreateWithoutLevelInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.lazy(() => NoteCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateWithoutLevelInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateWithoutLevelInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  notes: z.lazy(() => NoteUncheckedCreateNestedManyWithoutFragmentInputSchema).optional()
}).strict();

export const FragmentCreateOrConnectWithoutLevelInputSchema: z.ZodType<Prisma.FragmentCreateOrConnectWithoutLevelInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema) ]),
}).strict();

export const GameModeCreateWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeCreateWithoutLevelsInput> = z.object({
  name: z.string(),
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutGameModesInputSchema).optional()
}).strict();

export const GameModeUncheckedCreateWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeUncheckedCreateWithoutLevelsInput> = z.object({
  id: z.number().optional(),
  id_levelResult: z.number().optional().nullable(),
  name: z.string()
}).strict();

export const GameModeCreateOrConnectWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeCreateOrConnectWithoutLevelsInput> = z.object({
  where: z.lazy(() => GameModeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelsInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema) ]),
}).strict();

export const LevelResultCreateWithoutLevelsInputSchema: z.ZodType<Prisma.LevelResultCreateWithoutLevelsInput> = z.object({
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number(),
  transposed: z.number(),
  reactionTime: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutLevelResultsInputSchema),
  gameModes: z.lazy(() => GameModeCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUncheckedCreateWithoutLevelsInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateWithoutLevelsInput> = z.object({
  id: z.number().optional(),
  id_User: z.string(),
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number(),
  transposed: z.number(),
  reactionTime: z.number(),
  gameModes: z.lazy(() => GameModeUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultCreateOrConnectWithoutLevelsInputSchema: z.ZodType<Prisma.LevelResultCreateOrConnectWithoutLevelsInput> = z.object({
  where: z.lazy(() => LevelResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutLevelsInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutLevelsInputSchema) ]),
}).strict();

export const GameUpsertWithoutLevelsInputSchema: z.ZodType<Prisma.GameUpsertWithoutLevelsInput> = z.object({
  update: z.union([ z.lazy(() => GameUpdateWithoutLevelsInputSchema),z.lazy(() => GameUncheckedUpdateWithoutLevelsInputSchema) ]),
  create: z.union([ z.lazy(() => GameCreateWithoutLevelsInputSchema),z.lazy(() => GameUncheckedCreateWithoutLevelsInputSchema) ]),
}).strict();

export const GameUpdateWithoutLevelsInputSchema: z.ZodType<Prisma.GameUpdateWithoutLevelsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUpdateManyWithoutGameNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateWithoutLevelsInputSchema: z.ZodType<Prisma.GameUncheckedUpdateWithoutLevelsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamUncheckedUpdateManyWithoutGameNestedInputSchema).optional()
}).strict();

export const FragmentUpsertWithWhereUniqueWithoutLevelInputSchema: z.ZodType<Prisma.FragmentUpsertWithWhereUniqueWithoutLevelInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FragmentUpdateWithoutLevelInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutLevelInputSchema) ]),
  create: z.union([ z.lazy(() => FragmentCreateWithoutLevelInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutLevelInputSchema) ]),
}).strict();

export const FragmentUpdateWithWhereUniqueWithoutLevelInputSchema: z.ZodType<Prisma.FragmentUpdateWithWhereUniqueWithoutLevelInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FragmentUpdateWithoutLevelInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutLevelInputSchema) ]),
}).strict();

export const FragmentUpdateManyWithWhereWithoutLevelInputSchema: z.ZodType<Prisma.FragmentUpdateManyWithWhereWithoutLevelInput> = z.object({
  where: z.lazy(() => FragmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FragmentUpdateManyMutationInputSchema),z.lazy(() => FragmentUncheckedUpdateManyWithoutFragmentsInputSchema) ]),
}).strict();

export const FragmentScalarWhereInputSchema: z.ZodType<Prisma.FragmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FragmentScalarWhereInputSchema),z.lazy(() => FragmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FragmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FragmentScalarWhereInputSchema),z.lazy(() => FragmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const GameModeUpsertWithWhereUniqueWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeUpsertWithWhereUniqueWithoutLevelsInput> = z.object({
  where: z.lazy(() => GameModeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameModeUpdateWithoutLevelsInputSchema),z.lazy(() => GameModeUncheckedUpdateWithoutLevelsInputSchema) ]),
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelsInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelsInputSchema) ]),
}).strict();

export const GameModeUpdateWithWhereUniqueWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeUpdateWithWhereUniqueWithoutLevelsInput> = z.object({
  where: z.lazy(() => GameModeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameModeUpdateWithoutLevelsInputSchema),z.lazy(() => GameModeUncheckedUpdateWithoutLevelsInputSchema) ]),
}).strict();

export const GameModeUpdateManyWithWhereWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeUpdateManyWithWhereWithoutLevelsInput> = z.object({
  where: z.lazy(() => GameModeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameModeUpdateManyMutationInputSchema),z.lazy(() => GameModeUncheckedUpdateManyWithoutGameModesInputSchema) ]),
}).strict();

export const GameModeScalarWhereInputSchema: z.ZodType<Prisma.GameModeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GameModeScalarWhereInputSchema),z.lazy(() => GameModeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameModeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameModeScalarWhereInputSchema),z.lazy(() => GameModeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_levelResult: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LevelResultUpsertWithoutLevelsInputSchema: z.ZodType<Prisma.LevelResultUpsertWithoutLevelsInput> = z.object({
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutLevelsInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutLevelsInputSchema) ]),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutLevelsInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutLevelsInputSchema) ]),
}).strict();

export const LevelResultUpdateWithoutLevelsInputSchema: z.ZodType<Prisma.LevelResultUpdateWithoutLevelsInput> = z.object({
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLevelResultsNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateWithoutLevelsInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateWithoutLevelsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_User: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gameModes: z.lazy(() => GameModeUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const NoteCreateWithoutFragmentInputSchema: z.ZodType<Prisma.NoteCreateWithoutFragmentInput> = z.object({
  name: z.string(),
  time: z.number(),
  duration: z.number(),
  speed: z.number()
}).strict();

export const NoteUncheckedCreateWithoutFragmentInputSchema: z.ZodType<Prisma.NoteUncheckedCreateWithoutFragmentInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  time: z.number(),
  duration: z.number(),
  speed: z.number()
}).strict();

export const NoteCreateOrConnectWithoutFragmentInputSchema: z.ZodType<Prisma.NoteCreateOrConnectWithoutFragmentInput> = z.object({
  where: z.lazy(() => NoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const LevelCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelCreateWithoutFragmentsInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number().optional().nullable(),
  fragmentToShow: z.number(),
  game: z.lazy(() => GameCreateNestedOneWithoutLevelsInputSchema).optional(),
  gameModes: z.lazy(() => GameModeCreateNestedManyWithoutLevelsInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutLevelsInputSchema).optional()
}).strict();

export const LevelUncheckedCreateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUncheckedCreateWithoutFragmentsInput> = z.object({
  id: z.number().optional(),
  id_Game: z.number().optional().nullable(),
  id_levelResult: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number().optional().nullable(),
  fragmentToShow: z.number(),
  gameModes: z.lazy(() => GameModeUncheckedCreateNestedManyWithoutLevelsInputSchema).optional()
}).strict();

export const LevelCreateOrConnectWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelCreateOrConnectWithoutFragmentsInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const NoteUpsertWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.NoteUpsertWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => NoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NoteUpdateWithoutFragmentInputSchema),z.lazy(() => NoteUncheckedUpdateWithoutFragmentInputSchema) ]),
  create: z.union([ z.lazy(() => NoteCreateWithoutFragmentInputSchema),z.lazy(() => NoteUncheckedCreateWithoutFragmentInputSchema) ]),
}).strict();

export const NoteUpdateWithWhereUniqueWithoutFragmentInputSchema: z.ZodType<Prisma.NoteUpdateWithWhereUniqueWithoutFragmentInput> = z.object({
  where: z.lazy(() => NoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NoteUpdateWithoutFragmentInputSchema),z.lazy(() => NoteUncheckedUpdateWithoutFragmentInputSchema) ]),
}).strict();

export const NoteUpdateManyWithWhereWithoutFragmentInputSchema: z.ZodType<Prisma.NoteUpdateManyWithWhereWithoutFragmentInput> = z.object({
  where: z.lazy(() => NoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NoteUpdateManyMutationInputSchema),z.lazy(() => NoteUncheckedUpdateManyWithoutNotesInputSchema) ]),
}).strict();

export const NoteScalarWhereInputSchema: z.ZodType<Prisma.NoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteScalarWhereInputSchema),z.lazy(() => NoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteScalarWhereInputSchema),z.lazy(() => NoteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_Fragment: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  time: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  speed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const LevelUpsertWithWhereUniqueWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUpsertWithWhereUniqueWithoutFragmentsInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelUpdateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutFragmentsInputSchema) ]),
  create: z.union([ z.lazy(() => LevelCreateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedCreateWithoutFragmentsInputSchema) ]),
}).strict();

export const LevelUpdateWithWhereUniqueWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUpdateWithWhereUniqueWithoutFragmentsInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelUpdateWithoutFragmentsInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutFragmentsInputSchema) ]),
}).strict();

export const LevelUpdateManyWithWhereWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUpdateManyWithWhereWithoutFragmentsInput> = z.object({
  where: z.lazy(() => LevelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelUpdateManyMutationInputSchema),z.lazy(() => LevelUncheckedUpdateManyWithoutLevelInputSchema) ]),
}).strict();

export const FragmentCreateWithoutNotesInputSchema: z.ZodType<Prisma.FragmentCreateWithoutNotesInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  level: z.lazy(() => LevelCreateNestedManyWithoutFragmentsInputSchema).optional()
}).strict();

export const FragmentUncheckedCreateWithoutNotesInputSchema: z.ZodType<Prisma.FragmentUncheckedCreateWithoutNotesInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  level: z.lazy(() => LevelUncheckedCreateNestedManyWithoutFragmentsInputSchema).optional()
}).strict();

export const FragmentCreateOrConnectWithoutNotesInputSchema: z.ZodType<Prisma.FragmentCreateOrConnectWithoutNotesInput> = z.object({
  where: z.lazy(() => FragmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FragmentCreateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutNotesInputSchema) ]),
}).strict();

export const FragmentUpsertWithoutNotesInputSchema: z.ZodType<Prisma.FragmentUpsertWithoutNotesInput> = z.object({
  update: z.union([ z.lazy(() => FragmentUpdateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedUpdateWithoutNotesInputSchema) ]),
  create: z.union([ z.lazy(() => FragmentCreateWithoutNotesInputSchema),z.lazy(() => FragmentUncheckedCreateWithoutNotesInputSchema) ]),
}).strict();

export const FragmentUpdateWithoutNotesInputSchema: z.ZodType<Prisma.FragmentUpdateWithoutNotesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.lazy(() => LevelUpdateManyWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateWithoutNotesInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateWithoutNotesInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.lazy(() => LevelUncheckedUpdateManyWithoutFragmentsNestedInputSchema).optional()
}).strict();

export const LevelCreateWithoutGameModesInputSchema: z.ZodType<Prisma.LevelCreateWithoutGameModesInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number().optional().nullable(),
  fragmentToShow: z.number(),
  game: z.lazy(() => GameCreateNestedOneWithoutLevelsInputSchema).optional(),
  fragments: z.lazy(() => FragmentCreateNestedManyWithoutLevelInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultCreateNestedOneWithoutLevelsInputSchema).optional()
}).strict();

export const LevelUncheckedCreateWithoutGameModesInputSchema: z.ZodType<Prisma.LevelUncheckedCreateWithoutGameModesInput> = z.object({
  id: z.number().optional(),
  id_Game: z.number().optional().nullable(),
  id_levelResult: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number().optional().nullable(),
  fragmentToShow: z.number(),
  fragments: z.lazy(() => FragmentUncheckedCreateNestedManyWithoutLevelInputSchema).optional()
}).strict();

export const LevelCreateOrConnectWithoutGameModesInputSchema: z.ZodType<Prisma.LevelCreateOrConnectWithoutGameModesInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelCreateWithoutGameModesInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema) ]),
}).strict();

export const LevelResultCreateWithoutGameModesInputSchema: z.ZodType<Prisma.LevelResultCreateWithoutGameModesInput> = z.object({
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number(),
  transposed: z.number(),
  reactionTime: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutLevelResultsInputSchema),
  levels: z.lazy(() => LevelCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUncheckedCreateWithoutGameModesInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateWithoutGameModesInput> = z.object({
  id: z.number().optional(),
  id_User: z.string(),
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number(),
  transposed: z.number(),
  reactionTime: z.number(),
  levels: z.lazy(() => LevelUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultCreateOrConnectWithoutGameModesInputSchema: z.ZodType<Prisma.LevelResultCreateOrConnectWithoutGameModesInput> = z.object({
  where: z.lazy(() => LevelResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutGameModesInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutGameModesInputSchema) ]),
}).strict();

export const LevelUpsertWithWhereUniqueWithoutGameModesInputSchema: z.ZodType<Prisma.LevelUpsertWithWhereUniqueWithoutGameModesInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelUpdateWithoutGameModesInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutGameModesInputSchema) ]),
  create: z.union([ z.lazy(() => LevelCreateWithoutGameModesInputSchema),z.lazy(() => LevelUncheckedCreateWithoutGameModesInputSchema) ]),
}).strict();

export const LevelUpdateWithWhereUniqueWithoutGameModesInputSchema: z.ZodType<Prisma.LevelUpdateWithWhereUniqueWithoutGameModesInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelUpdateWithoutGameModesInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutGameModesInputSchema) ]),
}).strict();

export const LevelUpdateManyWithWhereWithoutGameModesInputSchema: z.ZodType<Prisma.LevelUpdateManyWithWhereWithoutGameModesInput> = z.object({
  where: z.lazy(() => LevelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelUpdateManyMutationInputSchema),z.lazy(() => LevelUncheckedUpdateManyWithoutLevelsInputSchema) ]),
}).strict();

export const LevelResultUpsertWithoutGameModesInputSchema: z.ZodType<Prisma.LevelResultUpsertWithoutGameModesInput> = z.object({
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutGameModesInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutGameModesInputSchema) ]),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutGameModesInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutGameModesInputSchema) ]),
}).strict();

export const LevelResultUpdateWithoutGameModesInputSchema: z.ZodType<Prisma.LevelResultUpdateWithoutGameModesInput> = z.object({
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLevelResultsNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateWithoutGameModesInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateWithoutGameModesInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_User: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserCreateWithoutLevelResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorCreateNestedOneWithoutUserInputSchema).optional(),
  typeCI: z.lazy(() => TypeCICreateNestedOneWithoutUserInputSchema).optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema).optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLevelResultsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  id_restGehoor: z.number().optional().nullable(),
  id_TypeCI: z.number().optional().nullable(),
  id_Role: z.number().optional().nullable(),
  id_Team: z.number().optional().nullable(),
  hadTraining: z.boolean().optional().nullable(),
  experience: z.number().optional().nullable(),
  processor: z.string().optional().nullable(),
  entreeVragenLijst: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLevelResultsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLevelResultsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLevelResultsInputSchema) ]),
}).strict();

export const GameModeCreateWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeCreateWithoutLevelResultInput> = z.object({
  name: z.string(),
  levels: z.lazy(() => LevelCreateNestedManyWithoutGameModesInputSchema).optional()
}).strict();

export const GameModeUncheckedCreateWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeUncheckedCreateWithoutLevelResultInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  levels: z.lazy(() => LevelUncheckedCreateNestedManyWithoutGameModesInputSchema).optional()
}).strict();

export const GameModeCreateOrConnectWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeCreateOrConnectWithoutLevelResultInput> = z.object({
  where: z.lazy(() => GameModeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema) ]),
}).strict();

export const LevelCreateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelCreateWithoutLevelResultInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number().optional().nullable(),
  fragmentToShow: z.number(),
  game: z.lazy(() => GameCreateNestedOneWithoutLevelsInputSchema).optional(),
  fragments: z.lazy(() => FragmentCreateNestedManyWithoutLevelInputSchema).optional(),
  gameModes: z.lazy(() => GameModeCreateNestedManyWithoutLevelsInputSchema).optional()
}).strict();

export const LevelUncheckedCreateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelUncheckedCreateWithoutLevelResultInput> = z.object({
  id: z.number().optional(),
  id_Game: z.number().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  BPM: z.number(),
  correctAnswers: z.number(),
  cooldownTime: z.number().optional().nullable(),
  fragmentToShow: z.number(),
  fragments: z.lazy(() => FragmentUncheckedCreateNestedManyWithoutLevelInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUncheckedCreateNestedManyWithoutLevelsInputSchema).optional()
}).strict();

export const LevelCreateOrConnectWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelCreateOrConnectWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelCreateWithoutLevelResultInputSchema),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema) ]),
}).strict();

export const LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerCreateWithoutLevelResultInput> = z.object({
  answeredCorrectly: z.boolean()
}).strict();

export const LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInput> = z.object({
  id: z.number().optional(),
  answeredCorrectly: z.boolean()
}).strict();

export const LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerCreateOrConnectWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema) ]),
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
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorUpdateOneWithoutUserNestedInputSchema).optional(),
  typeCI: z.lazy(() => TypeCIUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneWithoutUsersNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateOneWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLevelResultsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLevelResultsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const GameModeUpsertWithWhereUniqueWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeUpsertWithWhereUniqueWithoutLevelResultInput> = z.object({
  where: z.lazy(() => GameModeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameModeUpdateWithoutLevelResultInputSchema),z.lazy(() => GameModeUncheckedUpdateWithoutLevelResultInputSchema) ]),
  create: z.union([ z.lazy(() => GameModeCreateWithoutLevelResultInputSchema),z.lazy(() => GameModeUncheckedCreateWithoutLevelResultInputSchema) ]),
}).strict();

export const GameModeUpdateWithWhereUniqueWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeUpdateWithWhereUniqueWithoutLevelResultInput> = z.object({
  where: z.lazy(() => GameModeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameModeUpdateWithoutLevelResultInputSchema),z.lazy(() => GameModeUncheckedUpdateWithoutLevelResultInputSchema) ]),
}).strict();

export const GameModeUpdateManyWithWhereWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeUpdateManyWithWhereWithoutLevelResultInput> = z.object({
  where: z.lazy(() => GameModeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameModeUpdateManyMutationInputSchema),z.lazy(() => GameModeUncheckedUpdateManyWithoutGameModesInputSchema) ]),
}).strict();

export const LevelUpsertWithWhereUniqueWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelUpsertWithWhereUniqueWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelUpdateWithoutLevelResultInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutLevelResultInputSchema) ]),
  create: z.union([ z.lazy(() => LevelCreateWithoutLevelResultInputSchema),z.lazy(() => LevelUncheckedCreateWithoutLevelResultInputSchema) ]),
}).strict();

export const LevelUpdateWithWhereUniqueWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelUpdateWithWhereUniqueWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelUpdateWithoutLevelResultInputSchema),z.lazy(() => LevelUncheckedUpdateWithoutLevelResultInputSchema) ]),
}).strict();

export const LevelUpdateManyWithWhereWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelUpdateManyWithWhereWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelUpdateManyMutationInputSchema),z.lazy(() => LevelUncheckedUpdateManyWithoutLevelsInputSchema) ]),
}).strict();

export const LevelResultFragmentAnswerUpsertWithWhereUniqueWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpsertWithWhereUniqueWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LevelResultFragmentAnswerUpdateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedUpdateWithoutLevelResultInputSchema) ]),
  create: z.union([ z.lazy(() => LevelResultFragmentAnswerCreateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedCreateWithoutLevelResultInputSchema) ]),
}).strict();

export const LevelResultFragmentAnswerUpdateWithWhereUniqueWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpdateWithWhereUniqueWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelResultFragmentAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LevelResultFragmentAnswerUpdateWithoutLevelResultInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedUpdateWithoutLevelResultInputSchema) ]),
}).strict();

export const LevelResultFragmentAnswerUpdateManyWithWhereWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpdateManyWithWhereWithoutLevelResultInput> = z.object({
  where: z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LevelResultFragmentAnswerUpdateManyMutationInputSchema),z.lazy(() => LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultFragmentAnswersInputSchema) ]),
}).strict();

export const LevelResultFragmentAnswerScalarWhereInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema),z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema),z.lazy(() => LevelResultFragmentAnswerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_LevelResult: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  answeredCorrectly: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const LevelResultCreateWithoutLevelResultFragmentAnswersInputSchema: z.ZodType<Prisma.LevelResultCreateWithoutLevelResultFragmentAnswersInput> = z.object({
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number(),
  transposed: z.number(),
  reactionTime: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutLevelResultsInputSchema),
  gameModes: z.lazy(() => GameModeCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levels: z.lazy(() => LevelCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultUncheckedCreateWithoutLevelResultFragmentAnswersInputSchema: z.ZodType<Prisma.LevelResultUncheckedCreateWithoutLevelResultFragmentAnswersInput> = z.object({
  id: z.number().optional(),
  id_User: z.string(),
  playDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  timesListenedAgain: z.number(),
  transposed: z.number(),
  reactionTime: z.number(),
  gameModes: z.lazy(() => GameModeUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional(),
  levels: z.lazy(() => LevelUncheckedCreateNestedManyWithoutLevelResultInputSchema).optional()
}).strict();

export const LevelResultCreateOrConnectWithoutLevelResultFragmentAnswersInputSchema: z.ZodType<Prisma.LevelResultCreateOrConnectWithoutLevelResultFragmentAnswersInput> = z.object({
  where: z.lazy(() => LevelResultWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutLevelResultFragmentAnswersInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutLevelResultFragmentAnswersInputSchema) ]),
}).strict();

export const LevelResultUpsertWithoutLevelResultFragmentAnswersInputSchema: z.ZodType<Prisma.LevelResultUpsertWithoutLevelResultFragmentAnswersInput> = z.object({
  update: z.union([ z.lazy(() => LevelResultUpdateWithoutLevelResultFragmentAnswersInputSchema),z.lazy(() => LevelResultUncheckedUpdateWithoutLevelResultFragmentAnswersInputSchema) ]),
  create: z.union([ z.lazy(() => LevelResultCreateWithoutLevelResultFragmentAnswersInputSchema),z.lazy(() => LevelResultUncheckedCreateWithoutLevelResultFragmentAnswersInputSchema) ]),
}).strict();

export const LevelResultUpdateWithoutLevelResultFragmentAnswersInputSchema: z.ZodType<Prisma.LevelResultUpdateWithoutLevelResultFragmentAnswersInput> = z.object({
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLevelResultsNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateWithoutLevelResultFragmentAnswersInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateWithoutLevelResultFragmentAnswersInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_User: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gameModes: z.lazy(() => GameModeUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional()
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

export const LevelResultUpdateWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUpdateWithoutUserInput> = z.object({
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gameModes: z.lazy(() => GameModeUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gameModes: z.lazy(() => GameModeUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levels: z.lazy(() => LevelUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional(),
  levelResultFragmentAnswers: z.lazy(() => LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultNestedInputSchema).optional()
}).strict();

export const LevelResultUncheckedUpdateManyWithoutLevelResultsInputSchema: z.ZodType<Prisma.LevelResultUncheckedUpdateManyWithoutLevelResultsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  playDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timesListenedAgain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transposed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reactionTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserUpdateWithoutRestGehoorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  typeCI: z.lazy(() => TypeCIUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneWithoutUsersNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateOneWithoutUsersNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRestGehoorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRestGehoorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateWithoutTypeCIInputSchema: z.ZodType<Prisma.UserUpdateWithoutTypeCIInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneWithoutUsersNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateOneWithoutUsersNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTypeCIInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTypeCIInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorUpdateOneWithoutUserNestedInputSchema).optional(),
  typeCI: z.lazy(() => TypeCIUpdateOneWithoutUserNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateOneWithoutUsersNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Team: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUpdateWithoutKliniekInputSchema: z.ZodType<Prisma.TeamUpdateWithoutKliniekInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUpdateManyWithoutTeamNestedInputSchema).optional(),
  game: z.lazy(() => GameUpdateManyWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutKliniekInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutKliniekInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  game: z.lazy(() => GameUncheckedUpdateManyWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutTeamInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUpdateWithoutTeamInputSchema: z.ZodType<Prisma.UserUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  restGehoor: z.lazy(() => RestGehoorUpdateOneWithoutUserNestedInputSchema).optional(),
  typeCI: z.lazy(() => TypeCIUpdateOneWithoutUserNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneWithoutUsersNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_restGehoor: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_TypeCI: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_Role: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hadTraining: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  experience: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  processor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  entreeVragenLijst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  levelResults: z.lazy(() => LevelResultUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const GameUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.GameUpdateWithoutTeamsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelUpdateManyWithoutGameNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.GameUncheckedUpdateWithoutTeamsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelUncheckedUpdateManyWithoutGameNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateManyWithoutGameInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutGameInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUpdateWithoutGameInputSchema: z.ZodType<Prisma.TeamUpdateWithoutGameInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kliniek: z.lazy(() => KliniekUpdateOneWithoutTeamNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutGameInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutGameInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Kliniek: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateManyWithoutTeamsInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutTeamsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Kliniek: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LevelUpdateWithoutGameInputSchema: z.ZodType<Prisma.LevelUpdateWithoutGameInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => FragmentUpdateManyWithoutLevelNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUpdateManyWithoutLevelsNestedInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultUpdateOneWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelUncheckedUpdateWithoutGameInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateWithoutGameInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_levelResult: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => FragmentUncheckedUpdateManyWithoutLevelNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUncheckedUpdateManyWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelUncheckedUpdateManyWithoutLevelsInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateManyWithoutLevelsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_levelResult: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FragmentUpdateWithoutLevelInputSchema: z.ZodType<Prisma.FragmentUpdateWithoutLevelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.lazy(() => NoteUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateWithoutLevelInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateWithoutLevelInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.lazy(() => NoteUncheckedUpdateManyWithoutFragmentNestedInputSchema).optional()
}).strict();

export const FragmentUncheckedUpdateManyWithoutFragmentsInputSchema: z.ZodType<Prisma.FragmentUncheckedUpdateManyWithoutFragmentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GameModeUpdateWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeUpdateWithoutLevelsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levelResult: z.lazy(() => LevelResultUpdateOneWithoutGameModesNestedInputSchema).optional()
}).strict();

export const GameModeUncheckedUpdateWithoutLevelsInputSchema: z.ZodType<Prisma.GameModeUncheckedUpdateWithoutLevelsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_levelResult: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameModeUncheckedUpdateManyWithoutGameModesInputSchema: z.ZodType<Prisma.GameModeUncheckedUpdateManyWithoutGameModesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_levelResult: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.NoteUpdateWithoutFragmentInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateWithoutFragmentInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateWithoutFragmentInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateManyWithoutNotesInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyWithoutNotesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUpdateWithoutFragmentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  game: z.lazy(() => GameUpdateOneWithoutLevelsNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUpdateManyWithoutLevelsNestedInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultUpdateOneWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelUncheckedUpdateWithoutFragmentsInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateWithoutFragmentsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Game: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_levelResult: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gameModes: z.lazy(() => GameModeUncheckedUpdateManyWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelUncheckedUpdateManyWithoutLevelInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateManyWithoutLevelInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Game: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_levelResult: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelUpdateWithoutGameModesInputSchema: z.ZodType<Prisma.LevelUpdateWithoutGameModesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  game: z.lazy(() => GameUpdateOneWithoutLevelsNestedInputSchema).optional(),
  fragments: z.lazy(() => FragmentUpdateManyWithoutLevelNestedInputSchema).optional(),
  levelResult: z.lazy(() => LevelResultUpdateOneWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelUncheckedUpdateWithoutGameModesInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateWithoutGameModesInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Game: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_levelResult: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => FragmentUncheckedUpdateManyWithoutLevelNestedInputSchema).optional()
}).strict();

export const GameModeUpdateWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeUpdateWithoutLevelResultInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelUpdateManyWithoutGameModesNestedInputSchema).optional()
}).strict();

export const GameModeUncheckedUpdateWithoutLevelResultInputSchema: z.ZodType<Prisma.GameModeUncheckedUpdateWithoutLevelResultInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  levels: z.lazy(() => LevelUncheckedUpdateManyWithoutGameModesNestedInputSchema).optional()
}).strict();

export const LevelUpdateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelUpdateWithoutLevelResultInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  game: z.lazy(() => GameUpdateOneWithoutLevelsNestedInputSchema).optional(),
  fragments: z.lazy(() => FragmentUpdateManyWithoutLevelNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUpdateManyWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelUncheckedUpdateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelUncheckedUpdateWithoutLevelResultInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_Game: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  BPM: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  correctAnswers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cooldownTime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fragmentToShow: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fragments: z.lazy(() => FragmentUncheckedUpdateManyWithoutLevelNestedInputSchema).optional(),
  gameModes: z.lazy(() => GameModeUncheckedUpdateManyWithoutLevelsNestedInputSchema).optional()
}).strict();

export const LevelResultFragmentAnswerUpdateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpdateWithoutLevelResultInput> = z.object({
  answeredCorrectly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentAnswerUncheckedUpdateWithoutLevelResultInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUncheckedUpdateWithoutLevelResultInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  answeredCorrectly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultFragmentAnswersInputSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUncheckedUpdateManyWithoutLevelResultFragmentAnswersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  answeredCorrectly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

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

export const RestGehoorFindFirstArgsSchema: z.ZodType<Prisma.RestGehoorFindFirstArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  where: RestGehoorWhereInputSchema.optional(),
  orderBy: z.union([ RestGehoorOrderByWithRelationInputSchema.array(),RestGehoorOrderByWithRelationInputSchema ]).optional(),
  cursor: RestGehoorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RestGehoorScalarFieldEnumSchema.array().optional(),
}).strict()

export const RestGehoorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RestGehoorFindFirstOrThrowArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  where: RestGehoorWhereInputSchema.optional(),
  orderBy: z.union([ RestGehoorOrderByWithRelationInputSchema.array(),RestGehoorOrderByWithRelationInputSchema ]).optional(),
  cursor: RestGehoorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RestGehoorScalarFieldEnumSchema.array().optional(),
}).strict()

export const RestGehoorFindManyArgsSchema: z.ZodType<Prisma.RestGehoorFindManyArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  where: RestGehoorWhereInputSchema.optional(),
  orderBy: z.union([ RestGehoorOrderByWithRelationInputSchema.array(),RestGehoorOrderByWithRelationInputSchema ]).optional(),
  cursor: RestGehoorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RestGehoorScalarFieldEnumSchema.array().optional(),
}).strict()

export const RestGehoorAggregateArgsSchema: z.ZodType<Prisma.RestGehoorAggregateArgs> = z.object({
  where: RestGehoorWhereInputSchema.optional(),
  orderBy: z.union([ RestGehoorOrderByWithRelationInputSchema.array(),RestGehoorOrderByWithRelationInputSchema ]).optional(),
  cursor: RestGehoorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RestGehoorGroupByArgsSchema: z.ZodType<Prisma.RestGehoorGroupByArgs> = z.object({
  where: RestGehoorWhereInputSchema.optional(),
  orderBy: z.union([ RestGehoorOrderByWithAggregationInputSchema.array(),RestGehoorOrderByWithAggregationInputSchema ]).optional(),
  by: RestGehoorScalarFieldEnumSchema.array(),
  having: RestGehoorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RestGehoorFindUniqueArgsSchema: z.ZodType<Prisma.RestGehoorFindUniqueArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  where: RestGehoorWhereUniqueInputSchema,
}).strict()

export const RestGehoorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RestGehoorFindUniqueOrThrowArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  where: RestGehoorWhereUniqueInputSchema,
}).strict()

export const TypeCIFindFirstArgsSchema: z.ZodType<Prisma.TypeCIFindFirstArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  where: TypeCIWhereInputSchema.optional(),
  orderBy: z.union([ TypeCIOrderByWithRelationInputSchema.array(),TypeCIOrderByWithRelationInputSchema ]).optional(),
  cursor: TypeCIWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TypeCIScalarFieldEnumSchema.array().optional(),
}).strict()

export const TypeCIFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TypeCIFindFirstOrThrowArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  where: TypeCIWhereInputSchema.optional(),
  orderBy: z.union([ TypeCIOrderByWithRelationInputSchema.array(),TypeCIOrderByWithRelationInputSchema ]).optional(),
  cursor: TypeCIWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TypeCIScalarFieldEnumSchema.array().optional(),
}).strict()

export const TypeCIFindManyArgsSchema: z.ZodType<Prisma.TypeCIFindManyArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  where: TypeCIWhereInputSchema.optional(),
  orderBy: z.union([ TypeCIOrderByWithRelationInputSchema.array(),TypeCIOrderByWithRelationInputSchema ]).optional(),
  cursor: TypeCIWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TypeCIScalarFieldEnumSchema.array().optional(),
}).strict()

export const TypeCIAggregateArgsSchema: z.ZodType<Prisma.TypeCIAggregateArgs> = z.object({
  where: TypeCIWhereInputSchema.optional(),
  orderBy: z.union([ TypeCIOrderByWithRelationInputSchema.array(),TypeCIOrderByWithRelationInputSchema ]).optional(),
  cursor: TypeCIWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TypeCIGroupByArgsSchema: z.ZodType<Prisma.TypeCIGroupByArgs> = z.object({
  where: TypeCIWhereInputSchema.optional(),
  orderBy: z.union([ TypeCIOrderByWithAggregationInputSchema.array(),TypeCIOrderByWithAggregationInputSchema ]).optional(),
  by: TypeCIScalarFieldEnumSchema.array(),
  having: TypeCIScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TypeCIFindUniqueArgsSchema: z.ZodType<Prisma.TypeCIFindUniqueArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  where: TypeCIWhereUniqueInputSchema,
}).strict()

export const TypeCIFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TypeCIFindUniqueOrThrowArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  where: TypeCIWhereUniqueInputSchema,
}).strict()

export const RoleFindFirstArgsSchema: z.ZodType<Prisma.RoleFindFirstArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RoleScalarFieldEnumSchema.array().optional(),
}).strict()

export const RoleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoleFindFirstOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RoleScalarFieldEnumSchema.array().optional(),
}).strict()

export const RoleFindManyArgsSchema: z.ZodType<Prisma.RoleFindManyArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RoleScalarFieldEnumSchema.array().optional(),
}).strict()

export const RoleAggregateArgsSchema: z.ZodType<Prisma.RoleAggregateArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RoleGroupByArgsSchema: z.ZodType<Prisma.RoleGroupByArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithAggregationInputSchema.array(),RoleOrderByWithAggregationInputSchema ]).optional(),
  by: RoleScalarFieldEnumSchema.array(),
  having: RoleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RoleFindUniqueArgsSchema: z.ZodType<Prisma.RoleFindUniqueArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoleFindUniqueOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const KliniekFindFirstArgsSchema: z.ZodType<Prisma.KliniekFindFirstArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  where: KliniekWhereInputSchema.optional(),
  orderBy: z.union([ KliniekOrderByWithRelationInputSchema.array(),KliniekOrderByWithRelationInputSchema ]).optional(),
  cursor: KliniekWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KliniekScalarFieldEnumSchema.array().optional(),
}).strict()

export const KliniekFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KliniekFindFirstOrThrowArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  where: KliniekWhereInputSchema.optional(),
  orderBy: z.union([ KliniekOrderByWithRelationInputSchema.array(),KliniekOrderByWithRelationInputSchema ]).optional(),
  cursor: KliniekWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KliniekScalarFieldEnumSchema.array().optional(),
}).strict()

export const KliniekFindManyArgsSchema: z.ZodType<Prisma.KliniekFindManyArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  where: KliniekWhereInputSchema.optional(),
  orderBy: z.union([ KliniekOrderByWithRelationInputSchema.array(),KliniekOrderByWithRelationInputSchema ]).optional(),
  cursor: KliniekWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KliniekScalarFieldEnumSchema.array().optional(),
}).strict()

export const KliniekAggregateArgsSchema: z.ZodType<Prisma.KliniekAggregateArgs> = z.object({
  where: KliniekWhereInputSchema.optional(),
  orderBy: z.union([ KliniekOrderByWithRelationInputSchema.array(),KliniekOrderByWithRelationInputSchema ]).optional(),
  cursor: KliniekWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KliniekGroupByArgsSchema: z.ZodType<Prisma.KliniekGroupByArgs> = z.object({
  where: KliniekWhereInputSchema.optional(),
  orderBy: z.union([ KliniekOrderByWithAggregationInputSchema.array(),KliniekOrderByWithAggregationInputSchema ]).optional(),
  by: KliniekScalarFieldEnumSchema.array(),
  having: KliniekScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KliniekFindUniqueArgsSchema: z.ZodType<Prisma.KliniekFindUniqueArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  where: KliniekWhereUniqueInputSchema,
}).strict()

export const KliniekFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KliniekFindUniqueOrThrowArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  where: KliniekWhereUniqueInputSchema,
}).strict()

export const TeamFindFirstArgsSchema: z.ZodType<Prisma.TeamFindFirstArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TeamScalarFieldEnumSchema.array().optional(),
}).strict()

export const TeamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeamFindFirstOrThrowArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TeamScalarFieldEnumSchema.array().optional(),
}).strict()

export const TeamFindManyArgsSchema: z.ZodType<Prisma.TeamFindManyArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TeamScalarFieldEnumSchema.array().optional(),
}).strict()

export const TeamAggregateArgsSchema: z.ZodType<Prisma.TeamAggregateArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TeamGroupByArgsSchema: z.ZodType<Prisma.TeamGroupByArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithAggregationInputSchema.array(),TeamOrderByWithAggregationInputSchema ]).optional(),
  by: TeamScalarFieldEnumSchema.array(),
  having: TeamScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TeamFindUniqueArgsSchema: z.ZodType<Prisma.TeamFindUniqueArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict()

export const TeamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeamFindUniqueOrThrowArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict()

export const GameFindFirstArgsSchema: z.ZodType<Prisma.GameFindFirstArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithRelationInputSchema.array(),GameOrderByWithRelationInputSchema ]).optional(),
  cursor: GameWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GameScalarFieldEnumSchema.array().optional(),
}).strict()

export const GameFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GameFindFirstOrThrowArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithRelationInputSchema.array(),GameOrderByWithRelationInputSchema ]).optional(),
  cursor: GameWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GameScalarFieldEnumSchema.array().optional(),
}).strict()

export const GameFindManyArgsSchema: z.ZodType<Prisma.GameFindManyArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithRelationInputSchema.array(),GameOrderByWithRelationInputSchema ]).optional(),
  cursor: GameWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GameScalarFieldEnumSchema.array().optional(),
}).strict()

export const GameAggregateArgsSchema: z.ZodType<Prisma.GameAggregateArgs> = z.object({
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithRelationInputSchema.array(),GameOrderByWithRelationInputSchema ]).optional(),
  cursor: GameWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const GameGroupByArgsSchema: z.ZodType<Prisma.GameGroupByArgs> = z.object({
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithAggregationInputSchema.array(),GameOrderByWithAggregationInputSchema ]).optional(),
  by: GameScalarFieldEnumSchema.array(),
  having: GameScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const GameFindUniqueArgsSchema: z.ZodType<Prisma.GameFindUniqueArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereUniqueInputSchema,
}).strict()

export const GameFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GameFindUniqueOrThrowArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereUniqueInputSchema,
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

export const GameModeFindFirstArgsSchema: z.ZodType<Prisma.GameModeFindFirstArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  where: GameModeWhereInputSchema.optional(),
  orderBy: z.union([ GameModeOrderByWithRelationInputSchema.array(),GameModeOrderByWithRelationInputSchema ]).optional(),
  cursor: GameModeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GameModeScalarFieldEnumSchema.array().optional(),
}).strict()

export const GameModeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GameModeFindFirstOrThrowArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  where: GameModeWhereInputSchema.optional(),
  orderBy: z.union([ GameModeOrderByWithRelationInputSchema.array(),GameModeOrderByWithRelationInputSchema ]).optional(),
  cursor: GameModeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GameModeScalarFieldEnumSchema.array().optional(),
}).strict()

export const GameModeFindManyArgsSchema: z.ZodType<Prisma.GameModeFindManyArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  where: GameModeWhereInputSchema.optional(),
  orderBy: z.union([ GameModeOrderByWithRelationInputSchema.array(),GameModeOrderByWithRelationInputSchema ]).optional(),
  cursor: GameModeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: GameModeScalarFieldEnumSchema.array().optional(),
}).strict()

export const GameModeAggregateArgsSchema: z.ZodType<Prisma.GameModeAggregateArgs> = z.object({
  where: GameModeWhereInputSchema.optional(),
  orderBy: z.union([ GameModeOrderByWithRelationInputSchema.array(),GameModeOrderByWithRelationInputSchema ]).optional(),
  cursor: GameModeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const GameModeGroupByArgsSchema: z.ZodType<Prisma.GameModeGroupByArgs> = z.object({
  where: GameModeWhereInputSchema.optional(),
  orderBy: z.union([ GameModeOrderByWithAggregationInputSchema.array(),GameModeOrderByWithAggregationInputSchema ]).optional(),
  by: GameModeScalarFieldEnumSchema.array(),
  having: GameModeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const GameModeFindUniqueArgsSchema: z.ZodType<Prisma.GameModeFindUniqueArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  where: GameModeWhereUniqueInputSchema,
}).strict()

export const GameModeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GameModeFindUniqueOrThrowArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  where: GameModeWhereUniqueInputSchema,
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

export const LevelResultFragmentAnswerFindFirstArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerFindFirstArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  where: LevelResultFragmentAnswerWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentAnswerOrderByWithRelationInputSchema.array(),LevelResultFragmentAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultFragmentAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultFragmentAnswerScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultFragmentAnswerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerFindFirstOrThrowArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  where: LevelResultFragmentAnswerWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentAnswerOrderByWithRelationInputSchema.array(),LevelResultFragmentAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultFragmentAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultFragmentAnswerScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultFragmentAnswerFindManyArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerFindManyArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  where: LevelResultFragmentAnswerWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentAnswerOrderByWithRelationInputSchema.array(),LevelResultFragmentAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultFragmentAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LevelResultFragmentAnswerScalarFieldEnumSchema.array().optional(),
}).strict()

export const LevelResultFragmentAnswerAggregateArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerAggregateArgs> = z.object({
  where: LevelResultFragmentAnswerWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentAnswerOrderByWithRelationInputSchema.array(),LevelResultFragmentAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: LevelResultFragmentAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelResultFragmentAnswerGroupByArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerGroupByArgs> = z.object({
  where: LevelResultFragmentAnswerWhereInputSchema.optional(),
  orderBy: z.union([ LevelResultFragmentAnswerOrderByWithAggregationInputSchema.array(),LevelResultFragmentAnswerOrderByWithAggregationInputSchema ]).optional(),
  by: LevelResultFragmentAnswerScalarFieldEnumSchema.array(),
  having: LevelResultFragmentAnswerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LevelResultFragmentAnswerFindUniqueArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerFindUniqueArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  where: LevelResultFragmentAnswerWhereUniqueInputSchema,
}).strict()

export const LevelResultFragmentAnswerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerFindUniqueOrThrowArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  where: LevelResultFragmentAnswerWhereUniqueInputSchema,
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

export const RestGehoorCreateArgsSchema: z.ZodType<Prisma.RestGehoorCreateArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  data: z.union([ RestGehoorCreateInputSchema,RestGehoorUncheckedCreateInputSchema ]),
}).strict()

export const RestGehoorUpsertArgsSchema: z.ZodType<Prisma.RestGehoorUpsertArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  where: RestGehoorWhereUniqueInputSchema,
  create: z.union([ RestGehoorCreateInputSchema,RestGehoorUncheckedCreateInputSchema ]),
  update: z.union([ RestGehoorUpdateInputSchema,RestGehoorUncheckedUpdateInputSchema ]),
}).strict()

export const RestGehoorDeleteArgsSchema: z.ZodType<Prisma.RestGehoorDeleteArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  where: RestGehoorWhereUniqueInputSchema,
}).strict()

export const RestGehoorUpdateArgsSchema: z.ZodType<Prisma.RestGehoorUpdateArgs> = z.object({
  select: RestGehoorSelectSchema.optional(),
  include: RestGehoorIncludeSchema.optional(),
  data: z.union([ RestGehoorUpdateInputSchema,RestGehoorUncheckedUpdateInputSchema ]),
  where: RestGehoorWhereUniqueInputSchema,
}).strict()

export const RestGehoorUpdateManyArgsSchema: z.ZodType<Prisma.RestGehoorUpdateManyArgs> = z.object({
  data: z.union([ RestGehoorUpdateManyMutationInputSchema,RestGehoorUncheckedUpdateManyInputSchema ]),
  where: RestGehoorWhereInputSchema.optional(),
}).strict()

export const RestGehoorDeleteManyArgsSchema: z.ZodType<Prisma.RestGehoorDeleteManyArgs> = z.object({
  where: RestGehoorWhereInputSchema.optional(),
}).strict()

export const TypeCICreateArgsSchema: z.ZodType<Prisma.TypeCICreateArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  data: z.union([ TypeCICreateInputSchema,TypeCIUncheckedCreateInputSchema ]),
}).strict()

export const TypeCIUpsertArgsSchema: z.ZodType<Prisma.TypeCIUpsertArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  where: TypeCIWhereUniqueInputSchema,
  create: z.union([ TypeCICreateInputSchema,TypeCIUncheckedCreateInputSchema ]),
  update: z.union([ TypeCIUpdateInputSchema,TypeCIUncheckedUpdateInputSchema ]),
}).strict()

export const TypeCIDeleteArgsSchema: z.ZodType<Prisma.TypeCIDeleteArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  where: TypeCIWhereUniqueInputSchema,
}).strict()

export const TypeCIUpdateArgsSchema: z.ZodType<Prisma.TypeCIUpdateArgs> = z.object({
  select: TypeCISelectSchema.optional(),
  include: TypeCIIncludeSchema.optional(),
  data: z.union([ TypeCIUpdateInputSchema,TypeCIUncheckedUpdateInputSchema ]),
  where: TypeCIWhereUniqueInputSchema,
}).strict()

export const TypeCIUpdateManyArgsSchema: z.ZodType<Prisma.TypeCIUpdateManyArgs> = z.object({
  data: z.union([ TypeCIUpdateManyMutationInputSchema,TypeCIUncheckedUpdateManyInputSchema ]),
  where: TypeCIWhereInputSchema.optional(),
}).strict()

export const TypeCIDeleteManyArgsSchema: z.ZodType<Prisma.TypeCIDeleteManyArgs> = z.object({
  where: TypeCIWhereInputSchema.optional(),
}).strict()

export const RoleCreateArgsSchema: z.ZodType<Prisma.RoleCreateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
}).strict()

export const RoleUpsertArgsSchema: z.ZodType<Prisma.RoleUpsertArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
  create: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
  update: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
}).strict()

export const RoleDeleteArgsSchema: z.ZodType<Prisma.RoleDeleteArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleUpdateArgsSchema: z.ZodType<Prisma.RoleUpdateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleUpdateManyArgsSchema: z.ZodType<Prisma.RoleUpdateManyArgs> = z.object({
  data: z.union([ RoleUpdateManyMutationInputSchema,RoleUncheckedUpdateManyInputSchema ]),
  where: RoleWhereInputSchema.optional(),
}).strict()

export const RoleDeleteManyArgsSchema: z.ZodType<Prisma.RoleDeleteManyArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
}).strict()

export const KliniekCreateArgsSchema: z.ZodType<Prisma.KliniekCreateArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  data: z.union([ KliniekCreateInputSchema,KliniekUncheckedCreateInputSchema ]),
}).strict()

export const KliniekUpsertArgsSchema: z.ZodType<Prisma.KliniekUpsertArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  where: KliniekWhereUniqueInputSchema,
  create: z.union([ KliniekCreateInputSchema,KliniekUncheckedCreateInputSchema ]),
  update: z.union([ KliniekUpdateInputSchema,KliniekUncheckedUpdateInputSchema ]),
}).strict()

export const KliniekDeleteArgsSchema: z.ZodType<Prisma.KliniekDeleteArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  where: KliniekWhereUniqueInputSchema,
}).strict()

export const KliniekUpdateArgsSchema: z.ZodType<Prisma.KliniekUpdateArgs> = z.object({
  select: KliniekSelectSchema.optional(),
  include: KliniekIncludeSchema.optional(),
  data: z.union([ KliniekUpdateInputSchema,KliniekUncheckedUpdateInputSchema ]),
  where: KliniekWhereUniqueInputSchema,
}).strict()

export const KliniekUpdateManyArgsSchema: z.ZodType<Prisma.KliniekUpdateManyArgs> = z.object({
  data: z.union([ KliniekUpdateManyMutationInputSchema,KliniekUncheckedUpdateManyInputSchema ]),
  where: KliniekWhereInputSchema.optional(),
}).strict()

export const KliniekDeleteManyArgsSchema: z.ZodType<Prisma.KliniekDeleteManyArgs> = z.object({
  where: KliniekWhereInputSchema.optional(),
}).strict()

export const TeamCreateArgsSchema: z.ZodType<Prisma.TeamCreateArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  data: z.union([ TeamCreateInputSchema,TeamUncheckedCreateInputSchema ]),
}).strict()

export const TeamUpsertArgsSchema: z.ZodType<Prisma.TeamUpsertArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
  create: z.union([ TeamCreateInputSchema,TeamUncheckedCreateInputSchema ]),
  update: z.union([ TeamUpdateInputSchema,TeamUncheckedUpdateInputSchema ]),
}).strict()

export const TeamDeleteArgsSchema: z.ZodType<Prisma.TeamDeleteArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict()

export const TeamUpdateArgsSchema: z.ZodType<Prisma.TeamUpdateArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  data: z.union([ TeamUpdateInputSchema,TeamUncheckedUpdateInputSchema ]),
  where: TeamWhereUniqueInputSchema,
}).strict()

export const TeamUpdateManyArgsSchema: z.ZodType<Prisma.TeamUpdateManyArgs> = z.object({
  data: z.union([ TeamUpdateManyMutationInputSchema,TeamUncheckedUpdateManyInputSchema ]),
  where: TeamWhereInputSchema.optional(),
}).strict()

export const TeamDeleteManyArgsSchema: z.ZodType<Prisma.TeamDeleteManyArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
}).strict()

export const GameCreateArgsSchema: z.ZodType<Prisma.GameCreateArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  data: z.union([ GameCreateInputSchema,GameUncheckedCreateInputSchema ]),
}).strict()

export const GameUpsertArgsSchema: z.ZodType<Prisma.GameUpsertArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereUniqueInputSchema,
  create: z.union([ GameCreateInputSchema,GameUncheckedCreateInputSchema ]),
  update: z.union([ GameUpdateInputSchema,GameUncheckedUpdateInputSchema ]),
}).strict()

export const GameDeleteArgsSchema: z.ZodType<Prisma.GameDeleteArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereUniqueInputSchema,
}).strict()

export const GameUpdateArgsSchema: z.ZodType<Prisma.GameUpdateArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  data: z.union([ GameUpdateInputSchema,GameUncheckedUpdateInputSchema ]),
  where: GameWhereUniqueInputSchema,
}).strict()

export const GameUpdateManyArgsSchema: z.ZodType<Prisma.GameUpdateManyArgs> = z.object({
  data: z.union([ GameUpdateManyMutationInputSchema,GameUncheckedUpdateManyInputSchema ]),
  where: GameWhereInputSchema.optional(),
}).strict()

export const GameDeleteManyArgsSchema: z.ZodType<Prisma.GameDeleteManyArgs> = z.object({
  where: GameWhereInputSchema.optional(),
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

export const GameModeCreateArgsSchema: z.ZodType<Prisma.GameModeCreateArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  data: z.union([ GameModeCreateInputSchema,GameModeUncheckedCreateInputSchema ]),
}).strict()

export const GameModeUpsertArgsSchema: z.ZodType<Prisma.GameModeUpsertArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  where: GameModeWhereUniqueInputSchema,
  create: z.union([ GameModeCreateInputSchema,GameModeUncheckedCreateInputSchema ]),
  update: z.union([ GameModeUpdateInputSchema,GameModeUncheckedUpdateInputSchema ]),
}).strict()

export const GameModeDeleteArgsSchema: z.ZodType<Prisma.GameModeDeleteArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  where: GameModeWhereUniqueInputSchema,
}).strict()

export const GameModeUpdateArgsSchema: z.ZodType<Prisma.GameModeUpdateArgs> = z.object({
  select: GameModeSelectSchema.optional(),
  include: GameModeIncludeSchema.optional(),
  data: z.union([ GameModeUpdateInputSchema,GameModeUncheckedUpdateInputSchema ]),
  where: GameModeWhereUniqueInputSchema,
}).strict()

export const GameModeUpdateManyArgsSchema: z.ZodType<Prisma.GameModeUpdateManyArgs> = z.object({
  data: z.union([ GameModeUpdateManyMutationInputSchema,GameModeUncheckedUpdateManyInputSchema ]),
  where: GameModeWhereInputSchema.optional(),
}).strict()

export const GameModeDeleteManyArgsSchema: z.ZodType<Prisma.GameModeDeleteManyArgs> = z.object({
  where: GameModeWhereInputSchema.optional(),
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

export const LevelResultFragmentAnswerCreateArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerCreateArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  data: z.union([ LevelResultFragmentAnswerCreateInputSchema,LevelResultFragmentAnswerUncheckedCreateInputSchema ]),
}).strict()

export const LevelResultFragmentAnswerUpsertArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpsertArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  where: LevelResultFragmentAnswerWhereUniqueInputSchema,
  create: z.union([ LevelResultFragmentAnswerCreateInputSchema,LevelResultFragmentAnswerUncheckedCreateInputSchema ]),
  update: z.union([ LevelResultFragmentAnswerUpdateInputSchema,LevelResultFragmentAnswerUncheckedUpdateInputSchema ]),
}).strict()

export const LevelResultFragmentAnswerDeleteArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerDeleteArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  where: LevelResultFragmentAnswerWhereUniqueInputSchema,
}).strict()

export const LevelResultFragmentAnswerUpdateArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpdateArgs> = z.object({
  select: LevelResultFragmentAnswerSelectSchema.optional(),
  include: LevelResultFragmentAnswerIncludeSchema.optional(),
  data: z.union([ LevelResultFragmentAnswerUpdateInputSchema,LevelResultFragmentAnswerUncheckedUpdateInputSchema ]),
  where: LevelResultFragmentAnswerWhereUniqueInputSchema,
}).strict()

export const LevelResultFragmentAnswerUpdateManyArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerUpdateManyArgs> = z.object({
  data: z.union([ LevelResultFragmentAnswerUpdateManyMutationInputSchema,LevelResultFragmentAnswerUncheckedUpdateManyInputSchema ]),
  where: LevelResultFragmentAnswerWhereInputSchema.optional(),
}).strict()

export const LevelResultFragmentAnswerDeleteManyArgsSchema: z.ZodType<Prisma.LevelResultFragmentAnswerDeleteManyArgs> = z.object({
  where: LevelResultFragmentAnswerWhereInputSchema.optional(),
}).strict()