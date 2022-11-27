"""

Revision ID: b0bc8e78fd01
Revises: 7bf8a2b239d6
Create Date: 2022-11-27 14:30:01.416166

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b0bc8e78fd01'
down_revision = '7bf8a2b239d6'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'users_created_recipes', ['recipe'])
    op.create_unique_constraint(None, 'users_saved_recipes', ['recipe'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users_saved_recipes', type_='unique')
    op.drop_constraint(None, 'users_created_recipes', type_='unique')
    # ### end Alembic commands ###
