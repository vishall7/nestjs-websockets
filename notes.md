from now on we will use standard schema validation for incoming request and outgoing response
nest provides `StandardSchemaValidationPipe`, `StandardSchemaSerializerInterceptor`

use the `*.schema.ts` file to get, Insert, Select and Update schema,
use dtos folder, and then `*.request.dto.ts` and `*response.dto.ts` with the schemas defined

this is solid pattern as we get both type safety and runtime validation
and no metadata stamping and transforming of classes(dtos and entities)

**note** - use drizzle so we get the typed schema of the tables we have defined
