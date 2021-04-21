import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTasks1619024458960 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name:'description',
            type:'varchar',
          },
          {
            name:'done',
            type:'bool',
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
          {
            name: 'goal_id',
            type: 'uuid',
            isNullable: true,
          },
        ]
      })
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'TaskGoal',
        columnNames: ['goal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'goals',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tasks', 'TaskGoal');
    await queryRunner.dropTable('tasks');
  }

}
