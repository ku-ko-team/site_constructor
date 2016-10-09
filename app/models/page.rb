class Page < ApplicationRecord
	belongs_to :site

	validates_presence_of :name

	scope :decrease_position, ->(new_position, old_position) { where("position >= #{new_position} AND position < #{old_position}") }
	scope :increase_position, ->(new_position, old_position) { where("position <= #{new_position} AND position > #{old_position}") }

end