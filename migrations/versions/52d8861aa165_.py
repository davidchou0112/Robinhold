"""empty message

Revision ID: 52d8861aa165
Revises: 51720842f6e9
Create Date: 2022-11-18 14:07:02.980620

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '52d8861aa165'
down_revision = '51720842f6e9'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('watched_stocks')
    op.drop_table('watchlists')
    op.drop_table('transactions')
    op.drop_table('users')
    op.drop_table('stocks')


def downgrade():
    pass
