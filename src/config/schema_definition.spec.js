import SchemaDefinition from './schema_definition';
import SchemaFieldDefinition from './schema_field_definition';

describe('Schema Definition', () => {
    let schemaDefinitionConfig;

    beforeEach(() => {
        schemaDefinitionConfig = {
            title: "Create Widget Schema",
            description: "The schema used to create widgets",
            fields: ['widgetName','widgetType',{
                name:'widgetCount',
                type:'number',
                required:false
            }]
        };
    });

    it('- Should throw if no config is provided', () => {
        try {
            const schema = new SchemaDefinition();
            fail();
        } catch(error) {
            expect(error.message).toEqual('A schema configuration must be provided')
        }
    })

    describe('- Defaults and constructor validation', () => {
        it('- should throw if title is not provided', () => {
            schemaDefinitionConfig.title = null;
            try {
                const schema = new SchemaDefinition(schemaDefinitionConfig);
                fail();
            } catch(error) {
                expect(error.message).toEqual('Schema configuration title is required and must be a string')
            }
        });

        it('- should throw if title is not a string', () => {
            schemaDefinitionConfig.title = ['notastring',1];
            try {
                const schema = new SchemaDefinition(schemaDefinitionConfig);
                fail();
            } catch(error) {
                expect(error.message).toEqual('Schema configuration title is required and must be a string')
            }
        });

        it('- should throw if description is not a string', () => {
            schemaDefinitionConfig.description = ['notastring',1];
            try {
                const schema = new SchemaDefinition(schemaDefinitionConfig);
                fail();
            } catch(error) {
                expect(error.message).toEqual('Schema configuration description must be a string')
            }
        });

        it('- should set the description to an empty string if no value provided', () => {
            schemaDefinitionConfig.description = null;
            const schema = new SchemaDefinition(schemaDefinitionConfig);
            expect(schema.description).toEqual('');
        });

        it('- should throw if no fields are provided', () => {
            schemaDefinitionConfig.fields = null;
            try {
                const schema = new SchemaDefinition(schemaDefinitionConfig);
                fail();
            } catch(error) {
                expect(error.message).toEqual('A schema must have at least one field')
            }
        });

        it('- should throw if no fields are provided', () => {
            schemaDefinitionConfig.fields = [];
            try {
                const schema = new SchemaDefinition(schemaDefinitionConfig);
                fail();
            } catch(error) {
                expect(error.message).toEqual('A schema must have at least one field')
            }
        });
    });

    describe('- Field construction', () => {
        it('- should add all required fields to the required fields array', () => {
            const schema = new SchemaDefinition(schemaDefinitionConfig);
            expect(schema.requiredFields).toEqual(['widgetName','widgetType']);
        });

        it('- should create a Schema Field object for each item in the config', () => {
            const schema = new SchemaDefinition(schemaDefinitionConfig);
            for (let fieldIndex = 0; fieldIndex < schema.fields.length; fieldIndex++) {
                const field = schema.fields[fieldIndex];
                expect(field instanceof SchemaFieldDefinition).toEqual(true);
            }
            expect(schema.fields.length).toEqual(schemaDefinitionConfig.fields.length);
        });
    });
});