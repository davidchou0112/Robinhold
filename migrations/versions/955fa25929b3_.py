"""empty message

Revision ID: 955fa25929b3
Revises: d9d3a5547ee5
Create Date: 2022-11-17 15:36:44.166482

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '955fa25929b3'
down_revision = 'd9d3a5547ee5'
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
