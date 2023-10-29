from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Lists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    items = db.relationship(
        "Items", backref="lists", lazy=True, cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "items": [item.to_dict() for item in self.items],
        }


class Items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    is_visible = db.Column(db.Boolean, default=True)
    is_done = db.Column(db.Boolean, default=False)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)  # noqa
    sub_items = db.relationship(
        "SubItems", backref="item", lazy=True, cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "is_visible": self.is_visible,
            "is_done": self.is_done,
            "sub_items": [sub_item.to_dict() for sub_item in self.sub_items],
        }


class SubItems(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    is_sub_visible = db.Column(db.Boolean, default=True)
    is_sub_done = db.Column(db.Boolean, default=False)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=False)
    sub_sub_items = db.relationship(
        "SubSubItems",
        backref="sub_item",
        lazy=True,
        cascade="all, delete-orphan",  # noqa
    )  # noqa

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "is_sub_visible": self.is_sub_visible,
            "is_sub_done": self.is_sub_done,
            "sub_sub_items": [
                sub_sub_item.to_dict() for sub_sub_item in self.sub_sub_items
            ],
        }


class SubSubItems(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    is_sub_sub_done = db.Column(db.Boolean, default=False)
    sub_item_id = db.Column(
        db.Integer, db.ForeignKey("sub_items.id"), nullable=False
    )  # noqa
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "is_sub_sub_done": self.is_sub_sub_done,
        }