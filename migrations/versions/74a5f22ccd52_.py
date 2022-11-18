"""empty message

Revision ID: 74a5f22ccd52
Revises: 88d32825dba2
Create Date: 2022-11-17 11:38:45.377832

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '74a5f22ccd52'
down_revision = '88d32825dba2'
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
