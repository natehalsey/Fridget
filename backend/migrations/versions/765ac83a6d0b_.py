"""

Revision ID: 765ac83a6d0b
Revises: e99cae9cc0c6
Create Date: 2022-11-13 17:10:59.001852

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '765ac83a6d0b'
down_revision = 'e99cae9cc0c6'
branch_labels = None
depends_on = None


def upgrade() -> None:
    with op.batch_alter_table(
        "recipes",
        reflect_args=[sa.Column('flag', sa.Boolean(create_constraint=True))],
    ) as batch_op:
        batch_op.add_column(sa.Column('created_by', sa.Integer(), nullable=True))
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipes_users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user', sa.Integer(), nullable=True),
    sa.Column('recipe', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['recipe'], ['recipes.id'], name='fk_recipes_users_recipes_recipe_id', onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user'], ['users.id'], name='fk_recipes_users_users_user_id', onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('fk_recipes_users_id_created_by', 'recipes', type_='foreignkey')
    op.drop_column('recipes', 'created_by')
    op.drop_table('recipes_users')
    # ### end Alembic commands ###
