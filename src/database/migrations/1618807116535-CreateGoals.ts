import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateGoals1618807116535 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'goals',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'title',
						type: 'varchar',
					},
					{
            name: 'startDate',
            type: 'timestamp with time zone',
					},
					{
            name: 'endDate',
            type: 'timestamp with time zone',
          },
					{
						name: 'description',
						type: 'varchar',
					},
					{
						name: 'points',
						type: 'int',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('goals');
	}

}
