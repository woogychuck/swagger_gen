import SchemaFieldDefinition from './schema_field_definition';

describe('Schema Field Definition', () => {
    let schemaFieldConfig;

    beforeEach(() => {
        schemaFieldConfig = {
            name:'widgetDirection',
            description: 'The direction you want the widget aimed',
            type: 'number',
            required: false
        };
    });

    it('- Should throw if no configuration is provided', () => {
        try{
            const schemaField = new SchemaFieldDefinition();
            fail();
        }catch(error){
            expect(error.message).toEqual('A field configuration must be provided');
        }
    });

    describe('- Defaults and constructor validation for object configs', () => {
        it('- should throw if no name is provided', () => {
            schemaFieldConfig.name = null;
            try{
                const schemaField = new SchemaFieldDefinition(schemaFieldConfig);
                fail();
            }catch(error){
                expect(error.message).toEqual('Field configuration name is required and must be a string');
            }
        });

        it('- should set name to equal config name property', () => {
            const schemaField = new SchemaFieldDefinition(schemaFieldConfig);
            expect(schemaField.name).toEqual(schemaFieldConfig.name);
        });

        it('- should set default required and type values', () => {
            schemaFieldConfig.type = null;
            schemaFieldConfig.required = null;
            const schemaField = new SchemaFieldDefinition(schemaFieldConfig);
            expect(schemaField.required).toEqual(true);
            expect(schemaField.type).toEqual('string');
        });

        it('- should set custom properties when provided', () => {
            const schemaField = new SchemaFieldDefinition(schemaFieldConfig);
            expect(schemaField.required).toEqual(false);
            expect(schemaField.type).toEqual('number');
        });
    });

    describe('- Defaults and constructor validation for string configs', () => {
        beforeEach(() => {
            schemaFieldConfig = 'widgetDirection';
        });

        it('- should set name to equal config', () => {
            const schemaField = new SchemaFieldDefinition(schemaFieldConfig);
            expect(schemaField.name).toEqual(schemaFieldConfig);
        });

        it('- should set required and type values', () => {
            const schemaField = new SchemaFieldDefinition(schemaFieldConfig);
            expect(schemaField.required).toEqual(true);
            expect(schemaField.type).toEqual('string');
        });

        it('- should set description', () => {
            const schemaField = new SchemaFieldDefinition(schemaFieldConfig);
            expect(schemaField.description).toEqual('widgetDirection is required and must be a string');
        });
    });
});